import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/features/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

export default store;

export type Store = ReturnType<typeof store.getState>;
