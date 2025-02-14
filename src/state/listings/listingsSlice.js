import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteListingIds: [],
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    addFavoriteListing: (state, action) => {
      state.favoriteListingIds.push(action.payload);
    },
    removeFavoriteListing: (state, action) => {
      state.favoriteListingIds = state.favoriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const { addFavoriteListing, removeFavoriteListing } =
  listingsSlice.actions;

export default listingsSlice.reducer;
