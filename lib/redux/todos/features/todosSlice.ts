import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface TodoInfo {
  heading: string;
  content: string;
  _id: string;
}

let storedTodoList: string | null;

if (typeof window !== "undefined") {
  storedTodoList = localStorage.getItem("TodoList");
} else {
  storedTodoList = null;
}

const initialState: TodoInfo[] = storedTodoList
  ? JSON.parse(storedTodoList)
  : [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeHeading(
      state,
      action: PayloadAction<{ _id: string; heading: string }>
    ) {
      const todoToChange = state.find(
        (todo) => todo._id === action.payload._id
      );

      if (todoToChange) {
        todoToChange.heading = action.payload.heading;
        localStorage.setItem("TodoList", JSON.stringify(state));
      }
    },
    changeContent(
      state,
      action: PayloadAction<{ _id: string; content: string }>
    ) {
      const todoToChange = state.find(
        (todo) => todo._id === action.payload._id
      );

      if (todoToChange) {
        todoToChange.content = action.payload.content;
        localStorage.setItem("TodoList", JSON.stringify(state));
      }
    },
    createTodo(state) {
      state.push({
        heading: "",
        content: "",
        _id: nanoid(),
      });

      localStorage.setItem("TodoList", JSON.stringify(state));
    },
    deleteTodo(
      state: TodoInfo[],
      action: PayloadAction<{ _id: string }>
    ): TodoInfo[] {
      const deletedTodoIndex = state.findIndex(
        (todo) => todo._id === action.payload._id
      );

      if (deletedTodoIndex !== -1) {
        const newState = state.filter((_, index) => index !== deletedTodoIndex);

        localStorage.setItem("TodoList", JSON.stringify(newState));

        return newState;
      }

      return state;
    },
  },
});

export const { changeHeading, changeContent, createTodo, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
