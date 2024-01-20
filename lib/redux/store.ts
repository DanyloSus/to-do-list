//import from libraries
import { configureStore } from "@reduxjs/toolkit";
//internal import
import todosSlice from "./todos/features/todosSlice";

//create store
const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

//export store by default
export default store;

//export type of store for state in useSelector
export type Store = ReturnType<typeof store.getState>;
