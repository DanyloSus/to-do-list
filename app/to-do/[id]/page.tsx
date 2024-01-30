//useState needs client side
"use client";

//import from libraries
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import dayjs, { Dayjs } from "dayjs";

//internal imports
import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import Header from "@/elements/ToDoRightSection/Header";
import { ParamsIdType } from "@/types/types";
import { Store } from "@/lib/redux/store";
import { setDisabled as setDisabledRedux } from "@/lib/redux/disabled/features/disabledSlice";
import { setToDosHandle } from "@/elements/TodoElements/TodoList";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/elements/Form/Loading";
import MDEditor from "@uiw/react-md-editor";
import {
  TodoInfo,
  changeToDo,
  deleteToDo,
} from "@/lib/redux/todos/features/todosSlice";

const Page = ({ params }: ParamsIdType) => {
  //state for checking is toDo thing was changed
  const [isChanged, setIsChanged] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [hasUser, setHasUser] = useState<null | boolean>(null);
  const [dateTime, setDateTime] = useState<Date | null>();
  const [isViewMode, setIsViewMode] = useState(false);

  const { data: session } = useSession();

  //get all todos
  const todos = useSelector((state: Store) => state.todos);
  const darkMode = useSelector((state: Store) => state.darkMode);
  const disabled = useSelector((state: Store) => state.disbled);

  useEffect(() => {
    //filter todo by id
    const todo = todos.find((todo) => todo._id === params.id);

    if (todo && todo.attachedId === session?.user.id) {
      if (
        todo.dateTime &&
        todo.dateTime !== null &&
        new Date(todo.dateTime).getTime() <= new Date().getTime()
      ) {
        handleUpdate("deleted");
      }
      //set content of todo
      setHeading(todo.heading || "");
      setContent(todo.content || "");
      setStatus(todo.status || "active");
      setDateTime(todo.dateTime ? new Date(todo.dateTime) : null);
      setHasUser(true);
    } else {
      setHasUser(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  useEffect(() => {
    if (!isChanged) return;

    const handleOnBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = "");
    };
    window.addEventListener("beforeunload", handleOnBeforeUnload, {
      capture: true,
    });
    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
    };
  }, [isChanged]); // thanks to Colby Fayock

  const dispatch = useDispatch();

  const router = useRouter();

  const handleChangeMode = () => {
    setIsViewMode((value) => !value);
  };

  const setDisabled = (state: boolean) => {
    dispatch(setDisabledRedux(state));
  };

  //function for deleting
  function handleDelete() {
    setDisabled(true);
    if (session?.user.email === "admin@admin") {
      dispatch(deleteToDo(params.id));
      router.push("/to-do");
      setDisabled(false);
    } else {
      axios.delete(`/api/todos?id=${params.id}`).finally(() => {
        //set new ToDos
        setToDosHandle(session?.user.id, dispatch, session).then(() => {
          router.push("/to-do");
          setDisabled(false);
        });
      });
    }
  }

  //function for updating
  function handleUpdate(newStatus: string = status) {
    setIsChanged(false);
    setDisabled(true);

    if (session?.user.email === "admin@admin") {
      const newToDoInfo: TodoInfo = {
        heading,
        content,
        attachedId: session?.user.id,
        dateTime:
          newStatus === "completed" ||
          newStatus === "deleted" ||
          (newStatus === "active" &&
            (status === "deleted" || status === "completed"))
            ? null
            : dateTime,
        status: newStatus,
        _id: params.id,
      };
      dispatch(changeToDo(newToDoInfo));
      if (newStatus === "deleted") {
        router.push(`/to-do/${params.id}?filter=deleted`);
      } else if (newStatus === "completed") {
        router.push(`/to-do/${params.id}?filter=completed`);
      } else {
        router.push(`/to-do/${params.id}?filter=active`);
      }
      setDisabled(false);
    } else {
      axios
        .put(`/api/todos/${params.id}`, {
          newHeading: heading,
          newContent: content,
          attachedId: session?.user.id,
          newDateTime:
            newStatus === "completed" ||
            newStatus === "deleted" ||
            (newStatus === "active" &&
              (status === "deleted" || status === "completed"))
              ? null
              : dateTime,
          newStatus,
        })
        .finally(() => {
          if (newStatus === "deleted") {
            router.push(`/to-do/${params.id}?filter=deleted`);
          } else if (newStatus === "completed") {
            router.push(`/to-do/${params.id}?filter=completed`);
          } else {
            router.push(`/to-do/${params.id}?filter=active`);
          }
          setToDosHandle(session?.user.id, dispatch, session).finally(() => {
            setDisabled(false);
          });
        });
    }
  }

  return hasUser ? (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <Header
        id={params.id}
        heading={heading}
        content={content}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
        disabled={disabled}
        setDisabled={setDisabled}
        status={status}
        setDateTime={setDateTime}
        dateTime={dateTime}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        isViewMode={isViewMode}
        handleChangeMode={handleChangeMode}
      />
      <hr />
      {isViewMode ? (
        <>
          <Typography component="h1" sx={{ fontSize: "56px" }}>
            {heading}
          </Typography>
          <hr />
          <MDEditor.Markdown source={content} />
        </>
      ) : (
        <>
          <HeadingArea
            id={params.id}
            heading={heading}
            setIsChanged={setIsChanged}
            setHeading={setHeading}
            disabled={disabled}
            status={status}
            darkMode={darkMode}
          />
          <hr />
          <ContentArea
            id={params.id}
            content={content}
            setIsChanged={setIsChanged}
            setContent={setContent}
            disabled={disabled}
            status={status}
            darkMode={darkMode}
          />
        </>
      )}

      {disabled ? <Loading /> : null}
    </Box>
  ) : (
    // eslint-disable-next-line react/no-unescaped-entities
    <>To-Do doesn't exist</>
  );
};

export default Page;
