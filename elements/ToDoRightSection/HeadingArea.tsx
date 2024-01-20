"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/redux/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

interface Props {
  id: string;
  setHeading: Dispatch<SetStateAction<string>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const HeadingArea = (props: Props) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === props.id);
    setContent(todo?.heading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeHeadingHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setHeading(e.target.value);
    props.setIsChanged(true);
    setContent(e.target.value);
  }

  return (
    <TextareaAutosize
      placeholder="Heading of your to-do"
      className={classes.ToDoBox_Heading}
      value={content}
      onChange={changeHeadingHandler}
    />
  );
};

export default HeadingArea;
