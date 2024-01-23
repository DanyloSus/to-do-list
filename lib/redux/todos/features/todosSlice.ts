//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//export type of ToDo elements
export type TodoInfo = {
  heading: string;
  content: string;
  attachedId: string;
  status: string;
  _id: string;
};

//create initial state of the slice
const initialState: TodoInfo[] = [];

//create ToDo's slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setToDos(state, action: PayloadAction<TodoInfo[]>) {
      return action.payload;
    },
  },
});

//export actions of slice
export const { setToDos } = todosSlice.actions;

//export slice by default
export default todosSlice.reducer;
