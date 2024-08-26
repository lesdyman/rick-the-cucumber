import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from '@/features/characters';
import { placesSlice } from '@/features/places';

const rootReducer = combineSlices(
  charactersSlice,
  placesSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type rootReducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;