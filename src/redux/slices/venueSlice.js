import { createSlice } from "@reduxjs/toolkit";

const initialState = { venue: [] };

const venuSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    
    getAllVenues: (state, action) => {
      state.venue = action.payload;  // Direct mutation
    },
  },
});

export const { getAllVenues } = venuSlice.actions;
export default venuSlice.reducer;
