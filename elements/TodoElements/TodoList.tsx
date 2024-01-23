//internal imports
import TodoElement from "./TodoElement";
import { setToDos } from "@/lib/redux/todos/features/todosSlice";
import { Store } from "@/lib/redux/store";
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import { setDisabled as setDisabledRedux } from "@/lib/redux/disabled/features/disabledSlice";

//import from libraries
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import grey from "@mui/material/colors/grey";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch as DispatchRedux } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { setError } from "@/lib/redux/error/features/errorSlice";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

//export Promise for getting ToDo list
export const setToDosHandle = (
  id: string | undefined,
  dispatch: DispatchRedux
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/todos?attachedId=${id}`) // get values by user id
      .then((res) => {
        dispatch(setToDos(res.data.toDos)); // set values in redux
        resolve(res.data.toDos); // Resolve with the data you fetched
      })
      .catch((error) => {
        dispatch(setError(true));
        reject(error); // Reject with the error if any
      });
  });
};

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  loading: boolean;
};

const TodoList = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const disabled = useSelector((state: Store) => state.disbled);
  const error = useSelector((state: Store) => state.error);
  const todos = useSelector((state: Store) => state.todos);
  // get session values
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const setDisabled = (state: boolean) => {
    dispatch(setDisabledRedux(state));
  };

  useEffect(() => {
    // get values of user's toDos
    setLoading(true);
    setToDosHandle(props.session?.user.id, dispatch).finally(() =>
      setLoading(false)
    );

    if (props.session?.user.id) {
      props.setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.session]);
  // function for creating new ToDo
  function createTodoHandler() {
    setDisabled(true);
    axios.post("/api/todos", {
      heading: "",
      content: "",
      attachedId: props.session?.user.id,
      status: "active",
    }); // create empty ToDo
    setToDosHandle(props.session?.user.id, dispatch).finally(() =>
      setDisabled(false)
    ); // get new values
  }

  return (
    <>
      {props.loading ? (
        <></>
      ) : (
        <Box
          maxWidth="365px"
          width="100%"
          height="100%"
          maxHeight="100vh"
          border={`1px solid ${grey[300]}`}
          display="flex"
          flexDirection="column"
          position="fixed"
          left="0px"
          top="0px"
        >
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              px={1}
              py={1}
              alignItems="center"
              height="3rem"
              overflow="hidden"
            >
              <Button
                disabled={disabled}
                onClick={() => {
                  setDisabled(true);
                  signOut();
                }}
              >
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{ cursor: "pointer" }}
                >
                  {props.session?.user?.name}
                </Typography>
              </Button>
              <Button disabled={disabled} onClick={createTodoHandler}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Button>
            </Box>
            <ButtonGroup
              variant="text"
              aria-label="outlined button group"
              disabled={disabled}
            >
              <Button
                onClick={() => router.push(`${pathname}?filter=active`)}
                sx={
                  searchParams.get("filter") === "completed" ||
                  searchParams.get("filter") === "deleted"
                    ? {}
                    : {
                        backgroundColor: grey[300],
                      }
                }
              >
                Active
              </Button>
              <Button
                onClick={() => router.push(`${pathname}?filter=completed`)}
                sx={
                  searchParams.get("filter") === "completed"
                    ? {
                        backgroundColor: grey[300],
                      }
                    : {}
                }
              >
                Completed
              </Button>
              <Button
                onClick={() => router.push(`${pathname}?filter=deleted`)}
                sx={
                  searchParams.get("filter") === "deleted"
                    ? {
                        backgroundColor: grey[300],
                      }
                    : {}
                }
              >
                Deleted
              </Button>
            </ButtonGroup>
          </Box>
          <Box height="100%" overflow="hidden auto">
            {!error && loading ? (
              <>Loading...</>
            ) : props.session?.user ? (
              // render ToDo things
              todos.map((todo: TodoInfo) => {
                if (
                  (!searchParams.get("filter") &&
                    (!todo.status || "active" === todo.status)) ||
                  (!todo.status && searchParams.get("filter") === "active") ||
                  todo.status === searchParams.get("filter")
                ) {
                  return (
                    <TodoElement
                      heading={todo.heading}
                      content={todo.content}
                      attachedId={todo.attachedId}
                      status={todo.status}
                      _id={todo._id}
                      key={todo._id}
                      disabled={disabled}
                      setDisabled={setDisabled}
                      router={router}
                      params={params}
                      searchParams={searchParams}
                    />
                  );
                }
              })
            ) : null}{" "}
            {error && (
              <Typography color="error" component="h6">
                Something went wrong ;(
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TodoList;
