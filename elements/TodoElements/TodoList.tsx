import { Box, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import TodoElement from "./TodoElement";
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import grey from "@mui/material/colors/grey";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToDos } from "@/lib/redux/todos/features/todosSlice";
import { Store } from "@/lib/redux/store";

const TodoList = () => {
  const todos = useSelector((state: Store) => state.todos);

  const { data: session } = useSession();

  const dispatch = useDispatch();

  const setToDosHandle = () => {
    console.log(session?.user.id);

    axios.get(`/api/todos?attachedId=${session?.user.id}`).then((res) => {
      dispatch(setToDos(res.data.toDos));
    });
  };

  console.log("todos", todos);

  useEffect(() => {
    setToDosHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function createTodoHandler() {
    axios
      .post("/api/todos", {
        heading: "",
        content: "",
        attachedId: session?.user.id,
      })
      .finally(() => setToDosHandle());
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
        px={1}
        py={1}
        alignItems="center"
      >
        <Box>
          <Typography
            component="h2"
            variant="h4"
            sx={{ cursor: "pointer" }}
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
