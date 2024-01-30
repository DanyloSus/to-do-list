//import from libraries
import { configureStore } from "@reduxjs/toolkit";
//internal import
import todosSlice from "./todos/features/todosSlice";
import disabledSlice from "./disabled/features/disabledSlice";
import errorSlice from "./error/features/errorSlice";
import modeSlice from "./darkMode/features/modeSlice";

//create store
const store = configureStore({
  reducer: {
    todos: todosSlice,
    disbled: disabledSlice,
    darkMode: modeSlice,
    error: errorSlice,
  },
});

//export store by default
export default store;

//export type of store for state in useSelector
export type Store = ReturnType<typeof store.getState>;
