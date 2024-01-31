import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = false;

const hamSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    setHamburger(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setHamburger } = hamSlice.actions;

export default hamSlice.reducer;
