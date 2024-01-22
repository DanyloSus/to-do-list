import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = false;

const disabledSlice = createSlice({
  name: "disabled",
  initialState,
  reducers: {
    setDisabled(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setDisabled } = disabledSlice.actions;

export default disabledSlice.reducer;
