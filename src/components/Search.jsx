"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import getBooks from "@/lib/api";

const Search = ({ query, setQuery, setBooks, setPage, setLoading }) => {
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setPage(1);
    const res = await getBooks(query, 1);
    setBooks(res);
    setLoading(false);
    console.log(res);
  };

  // Solution for Debouncing :
  // const [debouncedQuery, setDebouncedQuery] = useState(query);
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 500);
  //   return () => clearTimeout(handler);
  // }, [query]);
  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     if (!debouncedQuery.trim()) return;
  //     setLoading(true);
  //     setPage(1);
  //     const res = await getBooks(debouncedQuery, 1);
  //     setBooks(res);
  //     setLoading(false);
  //   };
  //   fetchBooks();
  // }, [debouncedQuery]);

  return (
    <div className="search w-full mt-5 flex items-center gap-6 justify-between">
      <input
        type="text"
        className="w-full p-2 border-1 rounded"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        variant="outline"
        className="bg-gray-300 dark:bg-[#1d1d1d] rounded cursor-pointer border-none p-5.5 text-md hover:text-white hover:bg-[#161616]"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
