import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.users[user.id] = user;
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
