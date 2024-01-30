import { PayloadAction, createSlice } from "@reduxjs/toolkit";

let initialState;

if (typeof window !== "undefined") {
  initialState = localStorage.getItem("darkMode")
    ? JSON.parse(String(localStorage.getItem("darkMode")))
    : false;
} else {
  initialState = false;
}

const modeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      localStorage.setItem("darkMode", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setDarkMode } = modeSlice.actions;

export default modeSlice.reducer;
