"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { getTransformedDate } from '../../../utils/transformDate';
import { fetchData } from "@/utils/fetchData";
import { Location } from "@/types/Location";
import photo from '../../../assets/photo_assets/world.webp';
import { Character } from "@/types/Character";
import Grid from "@/components/grid";
import { Navbar } from "@/components/navbar";

const PlacePage = () => {
  const [place, setPlace] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);

  const { id } = useParams();

  const fetchPlace = useCallback(async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch place: ${res.status}`);
      }
      const data = await res.json();
      setPlace(data);

      const residentsData = await fetchData<Character>(data.residents);
      setResidents(residentsData);
    } catch (error) {
      console.error("Failed to fetch place or residents:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPlace();
    }
  }, [fetchPlace, id]);

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-overlay flex flex-col lg:flex-row p-10 gap-8">
          <Image
            src={photo}
            alt={place.name}
            width={400}
            height={300}
            layout="fit"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">{place.name}</h1>
            <p className="py-2">
              <strong>Type:</strong> {place.type}
            </p>
            <p className="py-2">
              <strong>Dimension:</strong> {place.dimension}
            </p>
            <p className="py-2">
              <strong>Created:</strong> {getTransformedDate(place.created)}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Residents:</h2>
        <div className="overflow-x-auto">
          <Grid itemsToShow={residents}/>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
