"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHeading } from "@/lib/features/todos/todosSlice";

const HeadingArea = (props: { slug: string }) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === props.slug);
    setContent(todo?.heading);
  }, []);

  function changeHeadingHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    dispatch(changeHeading({ id: props.slug, heading: e.target.value }));
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
