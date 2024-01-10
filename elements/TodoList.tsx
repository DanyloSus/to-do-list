import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import TodoElement from "./TodoElement";
import { TodoInfo } from "@/lib/features/todos/todosSlice";
import { Store } from "@/lib/store";
import grey from "@mui/material/colors/grey";

const TodoList = () => {
  const todos = useSelector((state: Store) => state.todos);

  console.log(todos, "LLo");
  return (
    <Box
      width="365px"
      height="100vh"
      border={`1px solid ${grey[300]}`}
      display="flex"
      flexDirection="column"
      position="fixed"
      left="0px"
      top="0px"
    >
      {todos.map((todo: TodoInfo) => (
        <TodoElement
          heading={todo.heading}
          content={todo.content}
          id={todo.id}
          key={todo.id}
        />
      ))}
    </Box>
  );
};

export default TodoList;
