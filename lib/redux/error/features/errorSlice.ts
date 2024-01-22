import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = false;

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
