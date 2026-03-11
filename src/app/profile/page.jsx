import { cookies } from "next/headers";
import { getSingleUser } from "@/lib/dal/user";
import Image from "next/image";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
        return <main className="p-4"><p>Not logged in</p></main>;
    }

    const user = await getSingleUser(userId, token);

    return (
        <main className="p-4 flex flex-col gap-4">

            <div className="flex">
                <figure className="p-4 rounded-full" style={{ backgroundColor: "var(--background-secondary)" }}>
                    <Image src={user.profilePicture || '/assets/profile_icon.png'}
                        alt={`${user.userFirstName} ${user.userLastName}`}
                        width={30} height={30}
                        className="w-8 h-8 object-cover "
                        unoptimized />
                </figure>
                <div className="ml-4 flex flex-col justify-center">
                    <p className="text-lg">{user.userFirstName} {user.userLastName}</p>
                    <p className="text-sm">{user.role}</p>
                </div>
            </div>

            {user.classes.length === 0 ? (
                <p>Not signed up to any classes yet.</p>
            ) : (
                <ul className="flex flex-col gap-2 border border-solid rounded-3xl p-4" >
                    {user.classes.map((classItem) => (
                        <li key={classItem.id}>
                            <p className="text-2xl font-semibold">{classItem.className}</p>
                            <p className="mt-4">{classItem.classDay} at {classItem.classTime}</p>
                        </li>
                    ))}
                    <div className="flex justify-between">
                        <button className="py-2 px-4 text-black rounded-full"
                            style={{
                                backgroundColor: "var(--background-secondary)"

                            }}>Show Class</button>
                        <button className="py-2 px-4 text-black rounded-full"
                            style={{
                                backgroundColor: "var(--background-secondary)"

                            }}>Leave</button>
                    </div>
                </ul>
            )}
        </main>
    );
}