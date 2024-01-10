"use client";

import classes from "@/app/to-do/to-do.module.css";
import { Store } from "@/lib/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React from "react";
import { useSelector } from "react-redux";

const ContentArea = (props: { slug: string }) => {
  const todos = useSelector((state: Store) => state.todos);
  const todo = todos.find((todo: { id: string }) => todo.id === props.slug);
  return (
    <TextareaAutosize
      placeholder="Content of your to-do"
      className={classes.ToDoBox_Content}
      value={todo?.content}
    />
  );
};

export default ContentArea;
