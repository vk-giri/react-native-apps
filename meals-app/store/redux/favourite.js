import { createSlice } from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'favourite',
  initialState: {
    ids: [],
  },
  reducers: {
    addFav: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFav: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addFav = favSlice.actions.addFav;
export const removeFav = favSlice.actions.removeFav;

export default favSlice.reducer;
