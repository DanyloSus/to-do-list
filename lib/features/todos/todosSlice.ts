import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TodoInfo {
  heading: string;
  content: string;
  id: string;
}

const initialState: TodoInfo[] | [] = [
  {
    heading: "Sus",
    content:
      "SusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSusSus",
    id: "sus",
  },
  {
    heading: "LOLOLOLOL",
    content:
      "LOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOLLOLOLOLOL",
    id: "LOLOLOLOL1",
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeArray(state, action: PayloadAction<TodoInfo>) {
      const todo: TodoInfo | undefined = state.find(
        (todo) => todo.id === action.payload.id
      );

      if (todo) {
        todo.content = action.payload.content;
        todo.heading = action.payload.heading;
      }
    },
  },
});

export const { changeArray } = todosSlice.actions;

export default todosSlice.reducer;
