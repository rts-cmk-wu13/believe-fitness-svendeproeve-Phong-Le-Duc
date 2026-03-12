import { searchClasses } from "@/lib/dal/searchClasses";
import { useState, useEffect } from "react";
import Link from "next/link";

function SearchResults({ searchTerm }) {
    const [allClasses, setAllClasses] = useState([]);

    useEffect(() => {
        async function fetchAll() {
            const response = await searchClasses(""); // fetch all classes
            setAllClasses(response.data || []);
        }
        fetchAll();
    }, []);

    const query = searchTerm.toLowerCase();
    const filtered = allClasses.filter(classItem =>
        classItem.className.toLowerCase().includes(query) ||
        classItem.classDescription.toLowerCase().includes(query) ||
        classItem.classDay.toLowerCase().includes(query) ||
        (classItem.trainer && classItem.trainer.trainerName.toLowerCase().includes(query))
    );

    if (!searchTerm) return null;

    return (
        <div className="mt-4">
            {filtered.length === 0 ? (
                <div className="text-gray-500">No classes found.</div>
            ) : (
                <ul className="space-y-2">
                    {filtered.map(classItem => (
                        <li key={classItem.id} className="border p-3 rounded hover:bg-gray-50">
                            <Link href={`/popular-classes/${classItem.id}`} className="font-semibold text-blue-600 hover:underline">
                                {classItem.className}
                            </Link>
                            <div className="text-sm text-gray-600">{classItem.classDescription}</div>
                            <div className="text-xs text-gray-400">
                                {classItem.classDay} &middot; Trainer: {classItem.trainer?.trainerName}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResults;

