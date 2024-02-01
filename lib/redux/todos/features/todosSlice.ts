//import from libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//export type of ToDo elements
export type TodoInfo = {
  heading: string;
  content: string;
  attachedId: string;
  status: string;
  dateTime?: Date | null;
  _id?: string;
};

//create initial state of the slice
const initialState: TodoInfo[] = [];

//create ToDo's slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setToDos(
      state,
      action: PayloadAction<{ toDos: TodoInfo[] } & { test: string }>
    ) {
      return action.payload.toDos;
    },
    addToDo(state, action: PayloadAction<TodoInfo>) {
      state.push(action.payload);
      localStorage.setItem("ToDos", JSON.stringify(state));
    },
    changeToDo(state, action: PayloadAction<TodoInfo>) {
      const idOfActiveState = state.findIndex(
        (todo) => todo._id === action.payload._id
      );
      state[idOfActiveState] = action.payload;
      localStorage.setItem("ToDos", JSON.stringify(state));
    },
    deleteToDo(state, action: PayloadAction<string>) {
      const newToDos = state.filter((toDo) => toDo._id !== action.payload);
      localStorage.setItem("ToDos", JSON.stringify(newToDos));
      return newToDos;
    },
  },
});

//export actions of slice
export const { setToDos, addToDo, changeToDo, deleteToDo } = todosSlice.actions;

//export slice by default
export default todosSlice.reducer;
