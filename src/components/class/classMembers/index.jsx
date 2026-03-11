"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleClassById } from "@/lib/dal/classes";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function ClassMembers() {
    const { id } = useParams();
    const [classItem, setClassItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClass() {
            try {
                const result = await getSingleClassById(id);
                setClassItem(result);
            } catch (error) {
                setClassItem(null);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchClass();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!classItem) return <p>Class not found.</p>;

    return (
        <main className="wrapper min-h-screen">
            <h3 className="font-bold text-lg mt-4">{classItem.className}</h3>
            <p className="text-sm">{classItem.classDay} {classItem.classTime}</p>
            <p className="mt-4 font-semibold">Participants:</p>
            {classItem.users && classItem.users.length > 0 ? (
                <ul className="flex flex-col gap-3 mt-2 mb-4">
                    {classItem.users.map(user => (
                        <li
                            className="flex justify-between items-center rounded-lg py-1 px-2"
                            style={{ backgroundColor: "var(--background-secondary)" }}
                            key={user.id}>
                            <div className="flex items-center">
                                <figure className="mr-2">
                                    <FaUser className="text-xl" />
                                </figure>
                                <p>{user.userFirstName} {user.userLastName}</p>
                            </div>

                            {/* <p>{user.age ? `age: ${user.age} ` : "Age unknown"}</p> */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm mt-2 mb-4">No participants signed up.</p>
            )}

            <Link href="/profile" className="mt-4">
                <button className="mb-4 bg-blue-950 text-white px-4 py-1 rounded-md text-sm">
                    Back to profile
                </button>
            </Link>
        </main>
    );
}