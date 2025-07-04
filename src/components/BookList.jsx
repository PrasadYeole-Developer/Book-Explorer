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

const BookList = ({ books, page, setPage, loading }) => {
  if (loading)
    return (
      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border rounded p-4 bg-[#111] text-white cursor-pointer"
          >
            <Skeleton className="w-full h-[18rem] rounded mb-6" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  else if (!books || books.length === 0) {
    return <p className="mt-10">No books found.</p>;
  }
  return (
    <>
      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book, index) => (
          <Link
            href={`/book/${book.cover_edition_key}`}
            key={index}
            className="border rounded p-4 bg-black text-white cursor-pointer"
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
              className="w-full h-[18rem] object-contain rounded mb-6"
            />
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-700">
              Author: {book.author_name?.[0]}
            </p>
            <p className="text-sm text-gray-600">
              First Published: {book.first_publish_year || "N/A"}
            </p>
          </Link>
        ))}
      </div>
      <Pagination className="pt-[2rem]">
        <PaginationContent className="flex gap-[1rem] pr-[1.3rem]">
          <PaginationItem
            className="bg-[#202020] rounded cursor-pointer"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationLink className="border-1 border-[#202020]">
            {page}
          </PaginationLink>
          <PaginationItem
            className="bg-[#202020] rounded cursor-pointer"
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
