import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "@/types/Character";

interface CharactersState {
  characters: Character[];
  status: "idle" | "loading" | "failed";
}

const initialState: CharactersState = {
  characters: [],
  status: "idle",
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (searchQuery: string) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
    );
    const data = await response.json();
    return data.results || [];
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "idle";
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default charactersSlice.reducer;
