"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React from "react";
import { useSelector } from "react-redux";

const HeadingArea = (props: { slug: string }) => {
  const todos = useSelector((state: Store) => state.todos);
  const todo = todos.find((todo) => todo.id === props.slug);
  return (
    <TextareaAutosize
      placeholder="Heading of your to-do"
      className={classes.ToDoBox_Heading}
      value={todo?.heading}
    />
  );
};

export default HeadingArea;
