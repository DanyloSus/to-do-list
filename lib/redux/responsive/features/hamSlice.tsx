//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//create initial state of the slice
const initialState = true;

//create Hamburger's slice
const hamSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    setHamburger(state, action: PayloadAction<boolean>) {
      // action for setting value of hamburger menu
      return action.payload;
    },
  },
});

//export actions of slice
export const { setHamburger } = hamSlice.actions;

//export slice by default
export default hamSlice.reducer;
