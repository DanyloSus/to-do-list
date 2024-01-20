import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export interface TodoInfo {
  heading: string;
  content: string;
  _id: string;
}

const initialState: TodoInfo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setToDos(state, action: PayloadAction<TodoInfo[]>) {
      return action.payload;
    },
  },
});

export const { setToDos } = todosSlice.actions;

export default todosSlice.reducer;
