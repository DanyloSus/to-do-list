import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TodoElement from "./TodoElement";
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import grey from "@mui/material/colors/grey";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const { data: session } = useSession();

  const getToDos = () => {
    axios
      .get(`/api/todos?attachedId=${session?.user.id}`)
      .then((res) => setTodos(res.data.toDos));
  };

  useEffect(() => {
    getToDos();
  }, [session]);

  function createTodoHandler() {
    axios
      .post("/api/todos", {
        heading: "",
        content: "",
        attachedId: session?.user.id,
      })
      .finally(() => getToDos());
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
      {session?.user &&
        todos.map((todo: TodoInfo) => (
          <TodoElement
            heading={todo.heading}
            content={todo.content}
            _id={todo._id}
            key={todo._id}
          />
        ))}
    </Box>
  );
};

export default TodoList;
function useCallback(arg0: () => void) {
  throw new Error("Function not implemented.");
}
