"use client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import BookList from "@/components/BookList";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import getBooks from "@/lib/api";
import React, { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import Filters from "@/components/Filters";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      setLoading(true);
      const res = await getBooks("History", 1);
      setBooks(res);
      setLoading(false);
    };
    fetchDefaultBooks();
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchBooks = async () => {
      setLoading(true);
      const res = await getBooks(query, page);
      setBooks(res);
      setLoading(false);
    };

    fetchBooks();
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-white text-[#0A0A0A] dark:bg-[#0A0A0A] dark:text-white p-6 select-none">
      <ProgressBar />
      <Loader />
      <Header
        setBooks={setBooks}
        page={page}
        setPage={setPage}
        query={query}
        setQuery={setQuery}
        setLoading={setLoading}
      />
      <Filters year={year} setYear={setYear} />
      <BookList
        books={books}
        page={page}
        setPage={setPage}
        loading={loading}
        query={query}
        year={year}
      />
    </div>
  );
};

export default Home;
