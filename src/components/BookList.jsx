"use client";
import Image from "next/image";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

const BookList = ({ books, page, setPage, loading, year }) => {
  const filteredBooks = books.filter((book) => {
    if (!year || year === "all") return true;
    const publishedYear = +book.first_publish_year;
    const [start, end] = year.split("-").map(Number);
    return publishedYear >= start && publishedYear <= end;
  });
  if (loading)
    return (
      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-[#111] cursor-pointer"
          >
            <Skeleton className="w-full h-[18rem] mb-6" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  else if (!books || books.length === 0 || filteredBooks.length === 0) {
    return <p className="mt-10 text-center text-lg">No results found.</p>;
  }
  return (
    <>
      <p className="text-md text-[#111] dark:text-[#f1f1f1] my-4 font-medium">
        Showing {filteredBooks.length} of {books.length} results
        {year && ` — ${year}`}
      </p>
      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book, index) => (
          <Link
            href={`/books/${book.cover_edition_key}`}
            key={index}
            className="border rounded bg-[#f1f1f1] text-[#111] dark:bg-[#111] dark:text-white cursor-pointer transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg dark:hover:shadow-[#111]"
          >
            <Image
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "/no-image.jpg"
              }
              alt={book.title}
              width={200}
              height={300}
              className="w-full h-[18rem] object-contain pt-5 object-top pb-5"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Author: {book.author_name?.[0]}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                First Published: {book.first_publish_year || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        className="pt-[2rem]"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <PaginationContent className="flex gap-[1rem] pr-[1.3rem]">
          <PaginationItem
            className="bg-white text-[#202020] dark:bg-[#202020] dark:text-white rounded cursor-pointer"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationLink className="border-1 border-[#a1a1a1] dark:border-[#202020]">
            {page}
          </PaginationLink>
          <PaginationItem
            className="bg-white text-[#202020] dark:bg-[#202020] dark:text-white rounded cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default BookList;
