//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//create initial state of the slice
const initialState = false;

//create Error's slice
const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<boolean>) {
      // action for setting Error in Redux
      return action.payload;
    },
  },
});

//export actions of slice
export const { setError } = errorSlice.actions;

//export slice by default
export default errorSlice.reducer;
