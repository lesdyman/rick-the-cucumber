"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { Navbar } from "../components/navbar";
import { AppDispatch, RootState } from "@/app/store";
import { fetchCharacters } from "../features/characters";
import { useRouter } from "next/navigation";;

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters.characters);
  const status = useSelector((state: RootState) => state.characters.status);

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim()) {
      dispatch(fetchCharacters(e.target.value));
    }
  };

  const filteredCharacters = useMemo(() => {
    if (!characters) return [];
    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, characters]);

  const handleClick = (characterId: number) => {
    router.push(`/heroes/${characterId}`)
  }

  return (
    <>
      <header className="mb-10">
        <Navbar />
      </header>

      <main className="pt-5 min-h-screen flex flex-col items-center m-10">
        <h2 className="mb-4 text-3xl font-bold">Looking for something, huh?</h2>

        <input
          type="text"
          placeholder="Type here"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-screen-lg"
        />
        {searchQuery.trim() && (
          <div className="carousel rounded-box mt-10 gap-2">
            {status === "loading" ? (
              <p>Loading characters...</p>
            ) : filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <div 
                className="carousel-item" 
                key={character.id}
                onClick={() => handleClick(character.id)}>
                  <img
                    src={character.image}
                    alt={character.name}
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                </div>
              ))
            ) : (
              <p>No characters found</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
