import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colorFilter: 'all',
    showOnlyFavourites: false,
  },
  reducers: {
    filterChanged: (state, action) => {
      state.colorFilter = action.payload;
    },
    favouritesFilterToggled: (state) => {
      state.showOnlyFavourites = !state.showOnlyFavourites;
    },
  },
});

export const { filterChanged, favouritesFilterToggled } = uiSlice.actions;

export const selectColorFilter = (state) => state.ui.colorFilter;
export const selectShowOnlyFavourites = (state) => state.ui.showOnlyFavourites;
export default uiSlice.reducer;
