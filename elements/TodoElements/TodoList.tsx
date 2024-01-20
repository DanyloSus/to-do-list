//internal imports
import TodoElement from "./TodoElement";
import { setToDos } from "@/lib/redux/todos/features/todosSlice";
import { Store } from "@/lib/redux/store";
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";

//import from libraries
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import grey from "@mui/material/colors/grey";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

//export Promise for getting ToDo list
export const setToDosHandle = (id: string | undefined, dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/todos?attachedId=${id}`) // get values by user id
      .then((res) => {
        dispatch(setToDos(res.data.toDos)); // set values in redux
        resolve(res.data.toDos); // Resolve with the data you fetched
      })
      .catch((error) => {
        reject(error); // Reject with the error if any
      });
  });
};

const TodoList = () => {
  // get values of user's toDos
  const todos = useSelector((state: Store) => state.todos);
  // get session values
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    // get values of user's toDos
    setToDosHandle(session?.user.id, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // function for creating new ToDo
  function createTodoHandler() {
    axios
      .post("/api/todos", {
        heading: "",
        content: "",
        attachedId: session?.user.id,
      }) // create empty ToDo
      .finally(() => setToDosHandle(session?.user.id, dispatch)); // get new values
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
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Box>
      {session?.user &&
        // render ToDo things
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
