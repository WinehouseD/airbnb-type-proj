import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from './listings/listingsSlice';
import usersReducer from './users/usersSlice';

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    users: usersReducer,
  },
});
