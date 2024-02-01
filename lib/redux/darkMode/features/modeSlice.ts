//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//create initial state of the slice
let initialState;

if (typeof window !== "undefined") {
  // Code executed in a browser environment (client-side)
  initialState = localStorage.getItem("darkMode")
    ? JSON.parse(String(localStorage.getItem("darkMode")))
    : false;
} else {
  // Code executed in a non-browser environment (e.g., server-side)
  initialState = false;
}

//create Dark Mode's slice
const modeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      // action for setting ToDos in Redux
      localStorage.setItem("darkMode", JSON.stringify(action.payload)); // save dark mode
      return action.payload;
    },
  },
});

//export actions of slice
export const { setDarkMode } = modeSlice.actions;

//export slice by default
export default modeSlice.reducer;
