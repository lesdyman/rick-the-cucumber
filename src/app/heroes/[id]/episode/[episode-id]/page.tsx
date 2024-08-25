'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Episode } from '@/types/Episode';
import { Navbar } from '@/components/navbar';
import photo from '../../../../../assets/R&M_just_photo.jpg';
import Image from 'next/image';
import { getTransformedDate } from '@/utils/transformDate';
import Grid from '@/components/grid';
import { Character } from '@/types/Character';
import { fetchData } from '@/utils/fetchData';

const EpisodePage = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[] | null>([]);
  const { 'episode-id': episodeId } = useParams();

  const fetchEpisode = async (episodeId: number) => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch episode: ${res.status}`);
      }
      const data = await res.json();
      setEpisode(data);

      fetchCharacters(data.characters);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCharacters = async (charactersUrls: string[]) => {
    try {
      const charactersData = await fetchData<Character>(charactersUrls);
      setCharacters(charactersData);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    }
  };

  useEffect(() => {
    if (episodeId) {
      fetchEpisode(parseInt(episodeId as string, 10));
    }
  }, [episodeId]);

  if (!episode) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero-overlay flex flex-col lg:flex-row p-10 gap-8">
          <Image
            src={photo}
            alt='just episode photo'
            width={400}
            height={300}
            layout="fit"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">{episode.name}</h1>
            <p className="py-2">
              <strong>Air Date:</strong> {episode.air_date}
            </p>
            <p className="py-2">
              <strong>Created:</strong> {getTransformedDate(episode.created)}
            </p>
            <p className="py-2">
              <strong>Season and Episode Code:</strong> {episode.episode}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Characters:</h2>
        <div className="overflow-x-auto">
          {characters && <Grid itemsToShow={characters} />}
        </div>
      </div>
    </>
  );
};

export default EpisodePage;
