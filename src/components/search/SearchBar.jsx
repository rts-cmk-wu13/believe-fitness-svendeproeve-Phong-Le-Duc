"use client";
import { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { searchClasses } from "@/lib/dal/searchClasses";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    const [inputValue, setInputValue] = useState(searchTerm);
    const inputRef = useRef(null);
    const router = useRouter();

    return (
        <form
            className="relative wrapper mx-auto  rounded flex items-center "
            style={{ minHeight: "50px" }}
            onSubmit={async e => {
                e.preventDefault();
                setSearchTerm(inputValue);

                const response = await searchClasses("");
                const classes = response.data || [];
                const query = inputValue.toLowerCase();


                const filtered = classes.filter(classItem =>
                    classItem.className.toLowerCase().includes(query) ||
                    classItem.classDescription.toLowerCase().includes(query) ||
                    classItem.classDay.toLowerCase().includes(query) ||
                    (classItem.trainer && classItem.trainer.trainerName.toLowerCase().includes(query))
                );


                const exactMatch = filtered.find(classItem =>
                    classItem.className.toLowerCase() === query
                );

                if (exactMatch && filtered.length === 1) {
                    router.push(`/popular-classes/${exactMatch.id}`);
                }
            }}
        >
            <div className="relative w-full flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none flex items-center">
                    <IoSearch />
                </span>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    type="search"
                    name="search"
                    placeholder="search classes"
                    className="pl-10 p-2 rounded-full w-full border border-gray-300 focus:outline-none text-gray-400 placeholder-gray-400"
                    style={{ color: '#9ca3af' }}
                />
            </div>

        </form>
    );
}