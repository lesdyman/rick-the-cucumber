'use client';

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import { Navbar } from "../../components/navbar";
import { Pagination } from "@/components/pagination";

import { Location } from "@/types/Location";

import photo from '../../assets/photo_assets/cluster.jpeg';
import { getContent } from "@/utils/getContent";
import { typeToImageMap } from "@/utils/typeToImageMap";

const BASE_USER_URL = 'https://rickandmortyapi.com/api/location';

export default function Places() {
  const [places, setPlaces] = useState<Location[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const getPlaces = useCallback(async () => {
    try {
      const data = await getContent<Location>(BASE_USER_URL, page);
      setPlaces(data.results);
      setTotalPages(data.info.pages);
    } catch {
      console.log('Error occurred while fetching places');
    }
  }, [page]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleClick = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/places/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl m-10 font-bold">Discover new worlds, Morthy, I mean... user:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {places.map((place) => (
            <div
              className="card bg-base-100 w-full max-w-sm sm:max-w-xs md:max-w-md lg:max-w-lg shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              key={place.id}
              onClick={() => handleCardClick(place.id)}
            >
              <figure className="relative h-48">
                <Image
                  src={typeToImageMap[place.type] || photo}
                  alt={place.name}
                  layout="fill"
                  objectFit="cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{place.name}</h2>
                <p>Dimension: {place.dimension}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={handleClick} />
    </>
  );
}
