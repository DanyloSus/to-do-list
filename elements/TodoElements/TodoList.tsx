import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoElement from "./TodoElement";
import { TodoInfo, createTodo } from "@/lib/redux/todos/features/todosSlice";
import { Store } from "@/lib/redux/store";
import grey from "@mui/material/colors/grey";
import { signOut, useSession } from "next-auth/react";

const TodoList = () => {
  const todos = useSelector((state: Store) => state.todos);

  const { data: session } = useSession();

  const dispatch = useDispatch();

  console.log(session?.user);

  function createTodoHandler() {
    if (!session?.user) {
      dispatch(createTodo());
      return;
    }
  }

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
      <Box
        display="flex"
        justifyContent="space-between"
        px={3}
        py={1}
        alignItems="center"
      >
        <Box>
          <Typography
            component="h2"
            sx={{ fontSize: "32px", cursor: "pointer" }}
            onClick={() => signOut()}
          >
            {session?.user?.name}
          </Typography>
        </Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={createTodoHandler}
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Box>
      {!session?.user &&
        todos.map((todo: TodoInfo) => (
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
