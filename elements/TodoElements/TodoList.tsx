//internal imports
import { addToDo, setToDos } from "@/lib/redux/todos/features/todosSlice";
import { Store } from "@/lib/redux/store";
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import { setDisabled as setDisabledRedux } from "@/lib/redux/disabled/features/disabledSlice";
import { setError } from "@/lib/redux/error/features/errorSlice";
import { setHamburger } from "@/lib/redux/responsive/features/hamSlice";
import Settings from "./Settings";
import TodoElement from "./TodoElement";
import { Wrapper } from "./ListWrapper";
import Loading from "../Form/Loading";

//import from libraries
import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Dispatch as DispatchRedux, nanoid } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import grey from "@mui/material/colors/grey";

//export Promise for getting ToDo list
export const setToDosHandle = (
  id: string | undefined,
  dispatch: DispatchRedux,
  session?: Session | null
) => {
  return new Promise((resolve, reject) => {
    // checking is user in Guest mode
    if (session?.user.email === "admin@admin") {
      const storedTodoList = localStorage.getItem("ToDos"); // get local ToDos
      const localToDos: TodoInfo[] & [] = storedTodoList
        ? JSON.parse(storedTodoList)
        : [];

      dispatch(setToDos({ toDos: localToDos, test: "51" })); // set local ToDos
      resolve(localToDos); // send local ToDos
    } else {
      axios
        .get(`/api/todos?attachedId=${id}`) // get values by user id
        .then((res) => {
          dispatch(setToDos({ toDos: res.data.toDos, test: "57" })); // set values in redux
          resolve(res.data.toDos); // Resolve with the data you fetched
        })
        .catch((error) => {
          dispatch(setError(true));
          reject(error); // Reject with the error if any
        });
    }
  });
};

// props of todos' list
type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  loading: boolean;
};

const TodoList = (props: Props) => {
  const [loading, setLoading] = useState(false); // state of loading

  const [count, setCount] = useState(5); // DDoS defense, count
  const [isDDoSDisabled, setIsDDoSDisabled] = useState(false); // DDoS defense, value

  useEffect(() => {
    // create interval of restarting count of DDoS
    const interval = setInterval(() => {
      setCount(5);
      setIsDDoSDisabled(false);
    }, 10000); // 1 second

    return () => clearInterval(interval);
  }, [count]);

  // function for DDoS
  const handleDDoS = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    } else {
      setIsDDoSDisabled(true);
    }
  };

  // values from redux
  const disabled = useSelector((state: Store) => state.disbled);
  const darkMode = useSelector((state: Store) => state.darkMode);
  const error = useSelector((state: Store) => state.error);
  const todos = useSelector((state: Store) => state.todos);
  const hamburger = useSelector((state: Store) => state.hamburger);

  const dispatch = useDispatch();

  const mediaQuery = useMediaQuery("(max-width:600px)"); // is screen's width less than 600px

  const pathname = usePathname(); // get pathname
  const router = useRouter(); // get router
  const searchParams = useSearchParams(); // function for searching params
  const params = useParams(); // get params

  const setDisabled = (state: boolean) => {
    dispatch(setDisabledRedux(state));
  };

  useEffect(() => {
    // get values of user's toDos
    if (props.session?.user.email) {
      setLoading(true);
      setToDosHandle(props.session?.user.id, dispatch, props.session).finally(
        () => setLoading(false)
      );
    }

    if (props.session?.user.id) {
      props.setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.session?.user.id]);

  // function for creating new ToDo
  function createTodoHandler() {
    setDisabled(true);

    // if Guest mode then add local
    if (props.session?.user.email === "admin@admin") {
      dispatch(
        addToDo({
          heading: "",
          content: "",
          attachedId: props.session?.user.id,
          _id: nanoid(),
          status: "active",
        })
      );
      setDisabled(false);
    } else {
      axios
        .post("/api/todos", {
          heading: "",
          content: "",
          attachedId: props.session?.user.id,
          status: "active",
        })
        .finally(() => {
          setToDosHandle(
            props.session?.user.id,
            dispatch,
            props.session
          ).finally(() => {
            setDisabled(false);
            handleDDoS();
          });
        });
    }
  }

  return (
    <>
      {props.loading ? (
        <></>
      ) : (
        <Wrapper
          left={mediaQuery && hamburger ? "0%" : "-100%"}
          sx={{
            background: darkMode ? grey[900] : "white",
            transition: "left 0.3s ease-in-out",
          }}
        >
          <Box>
            <Box
              display="flex"
              px={1}
              py={1}
              alignItems="center"
              height="3rem"
              overflow="hidden"
            >
              {props.session?.user.email === "admin@admin" ? null : (
                <Typography component="h2" variant="h4">
                  {props.session?.user?.name}
                </Typography>
              )}
              <Box ml="auto">
                <Settings disabled={disabled || loading} />
                <Button
                  disabled={disabled || isDDoSDisabled || loading}
                  onClick={createTodoHandler}
                >
                  {isDDoSDisabled ? "DDoS Defense" : null}
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
                {mediaQuery ? (
                  <Button
                    onClick={() => dispatch(setHamburger(false))}
                    disabled={disabled || loading}
                  >
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                ) : null}
              </Box>
            </Box>
            <ButtonGroup
              variant="text"
              aria-label="outlined button group"
              disabled={disabled || loading}
            >
              <Button
                onClick={() => router.push(`${pathname}?filter=active`)}
                sx={
                  searchParams.get("filter") === "completed" ||
                  searchParams.get("filter") === "deleted"
                    ? {}
                    : {
                        backgroundColor: darkMode ? grey[800] : grey[300],
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
                        backgroundColor: darkMode ? grey[800] : grey[300],
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
                        backgroundColor: darkMode ? grey[800] : grey[300],
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
              <Loading />
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
                      dateTime={todo.dateTime}
                      darkMode={darkMode}
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
        </Wrapper>
      )}
    </>
  );
};

export default TodoList;
