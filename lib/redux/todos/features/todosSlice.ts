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

const saveToDos = (state: TodoInfo[]) => {
  localStorage.setItem("ToDos", JSON.stringify(state)); // save ToDos
};

//create initial state of the slice
const initialState: TodoInfo[] = [];

//create ToDo's slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setToDos(
      // action for setting ToDos in Redux
      state,
      action: PayloadAction<{ toDos: TodoInfo[] } & { test: string }>
    ) {
      return action.payload.toDos;
    },

    // actions for quest
    addToDo(state, action: PayloadAction<TodoInfo>) {
      state.push(action.payload); // add ToDo
      saveToDos(state); // save ToDos
    },
    changeToDo(state, action: PayloadAction<TodoInfo>) {
      const idOfActiveState = state.findIndex(
        // find ToDo by ID
        (todo) => todo._id === action.payload._id
      );

      state[idOfActiveState] = action.payload; // change this ToDo
      saveToDos(state); // save ToDos
    },
    deleteToDo(state, action: PayloadAction<string>) {
      const newToDos = state.filter((toDo) => toDo._id !== action.payload); // filtering for deleting ToDo, by its id
      saveToDos(state); // save ToDos
      return newToDos;
    },
  },
});

//export actions of slice
export const { setToDos, addToDo, changeToDo, deleteToDo } = todosSlice.actions;

//export slice by default
export default todosSlice.reducer;
