"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/redux/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

interface Props {
  id: string;
  setContent: Dispatch<SetStateAction<string>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const ContentArea = (props: Props) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === props.id);
    setContent(todo?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeContentHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setContent(e.target.value);
    props.setIsChanged(true);
    setContent(e.target.value);
  }

  return (
    <TextareaAutosize
      placeholder="Content of your to-do"
      className={classes.ToDoBox_Content}
      value={content}
      onChange={changeContentHandler}
    />
  );
};

export default ContentArea;
