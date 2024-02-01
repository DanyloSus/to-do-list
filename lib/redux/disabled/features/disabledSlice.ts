//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//create initial state of the slice
const initialState = false;

//create Disabled's slice
const disabledSlice = createSlice({
  name: "disabled",
  initialState,
  reducers: {
    setDisabled(state, action: PayloadAction<boolean>) {
      // action for setting Disabled in Redux
      return action.payload;
    },
  },
});

//export actions of slice
export const { setDisabled } = disabledSlice.actions;

//export slice by default
export default disabledSlice.reducer;
