import { Location } from "@/types/Location";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PlacesState {
  locations: Location[];
  status: "idle" | "loading" | "failed";
  totalPages: number;
  page: number;
}

const initialState: PlacesState = {
  locations: [],
  status: "idle",
  totalPages: 0,
  page: 1,
};

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (page: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
    const data = await response.json();
    return {
      locations: data.results,
      totalPages: data.info.pages,
      page,
    };
  }
);

export const placesSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "idle";
        state.locations = action.payload.locations;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default placesSlice.reducer;
