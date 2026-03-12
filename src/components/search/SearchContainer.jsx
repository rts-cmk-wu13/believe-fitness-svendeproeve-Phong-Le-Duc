"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";


export default function SearchContainer() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SearchResults searchTerm={searchTerm} />
        </div>
    );
}