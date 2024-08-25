"use client";
import { Navbar } from "../../components/navbar";
import Grid from "@/components/grid";
import { useEffect, useState, useCallback } from "react";
import { Character } from "@/types/Character";
import { Pagination } from "@/components/pagination";
import { getContent } from "@/utils/getContent";

const BASE_USER_URL = "https://rickandmortyapi.com/api/character";

export default function Heroes() {
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleClick = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const getHeroes = useCallback(async () => {
    try {
      const data = await getContent<Character>(BASE_USER_URL, page);
      setHeroes(data.results);
      setTotalPages(data.info.pages);
    } catch {
      console.error("Error occurred while fetching heroes");
    }
  }, [page]);

  useEffect(() => {
    getHeroes();
  }, [getHeroes]);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl m-10 font-bold">Find your heroic bastard:</h1>
      <div className="grid-container pt-5 min-h-screen flex items-center justify-center m-10">
        <Grid itemsToShow={heroes} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={handleClick}/>
    </>
  );
}
