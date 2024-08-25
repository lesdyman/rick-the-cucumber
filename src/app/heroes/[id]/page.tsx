"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Character } from "@/types/Character";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Episode } from "@/types/Episode";
import { getTransformedDate } from "../../../utils/transformDate";
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";

const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const router = useRouter();
  const { id } = useParams();

  const fetchCharacter = useCallback(async () => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch character: ${res.status}`);
      }
      const data = await res.json();
      setCharacter(data);

      const episodesData = await fetchData<Episode>(data.episode);
      setEpisodes(episodesData);
    } catch (error) {
      console.error("Failed to fetch character or episodes:", error);
    }
  }, [id]);

  const parseEpisodeNumber = (episode: string) => {
    const match = episode.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const getLocationId = (): string | undefined => {
    if (!character || !character.location || !character.location.url) {
      console.error("Character or location URL is not available");
      return undefined;
    }

    const segments = character.location.url.split("/");
    const locationId = segments[segments.length - 1];

    return locationId;
  };

  const sort = (type: string) => {
    let sortedEpisodes = [...episodes];
    const newSortDirection =
      sortType === type && sortDirection === "asc" ? "desc" : "asc";

    switch (type) {
      case "name":
        sortedEpisodes.sort((ep1, ep2) =>
          newSortDirection === "asc"
            ? ep1.name.localeCompare(ep2.name)
            : ep2.name.localeCompare(ep1.name)
        );
        break;
      case "date":
        sortedEpisodes.sort((ep1, ep2) =>
          newSortDirection === "asc"
            ? new Date(ep1.air_date).getTime() -
              new Date(ep2.air_date).getTime()
            : new Date(ep2.air_date).getTime() -
              new Date(ep1.air_date).getTime()
        );
        break;
      case "episode":
        sortedEpisodes.sort((ep1, ep2) =>
          newSortDirection === "asc"
            ? parseEpisodeNumber(ep1.episode) - parseEpisodeNumber(ep2.episode)
            : parseEpisodeNumber(ep2.episode) - parseEpisodeNumber(ep1.episode)
        );
        break;
      default:
        break;
    }

    setEpisodes(sortedEpisodes);
    setSortType(type);
    setSortDirection(newSortDirection);
  };

  const handleEpisodeClick = (episodeId: string) => {
    router.push(`/heroes/${id}/episode/${episodeId}`);
  };

  useEffect(() => {
    if (id) {
      fetchCharacter();
    }
  }, [id, fetchCharacter]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const locationId = getLocationId();
  const isLocationUnknown = !locationId;

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-overlay flex flex-col lg:flex-row p-10 gap-8">
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={300}
            layout="intrinsic"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">{character.name}</h1>
            <p className="py-2">
              <strong>Status:</strong> {character.status}
            </p>
            <p className="py-2">
              <strong>Location:</strong>{" "}
              {isLocationUnknown ? (
                <span className="text-gray-500">Unknown</span>
              ) : (
                <Link href={`/places/${locationId}`} className="text-red-900">
                  {character.location.name}
                </Link>
              )}
            </p>
            <p className="py-2">
              <strong>Species:</strong> {character.species}
            </p>
            <p className="py-2">
              <strong>Gender:</strong> {character.gender}
            </p>
            <p className="py-2">
              <strong>Origin:</strong> {character.origin.name}
            </p>
            <p className="py-2">
              <strong>Created:</strong> {getTransformedDate(character.created)}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Episodes:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black">
            <thead className="bg-yellow-800">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer flex items-center"
                  onClick={() => sort("name")}
                >
                  Name
                  {sortType === "name" && (
                    <span
                      className={`ml-2 ${
                        sortDirection === "asc" ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => sort("date")}
                >
                  Air Date
                  {sortType === "date" && (
                    <span
                      className={`ml-2 ${
                        sortDirection === "asc" ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => sort("episode")}
                >
                  Episode
                  {sortType === "episode" && (
                    <span
                      className={`ml-2 ${
                        sortDirection === "asc" ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="bg-yellow-600 divide-y divide-black">
              {episodes.map((episode) => (
                <tr
                  key={episode.id}
                  className="hover:bg-yellow-400 transition-colors duration-300"
                  onClick={() => handleEpisodeClick(String(episode.id))}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {episode.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {episode.air_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {episode.episode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
