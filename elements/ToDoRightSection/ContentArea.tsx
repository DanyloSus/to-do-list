"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/redux/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeContent } from "@/lib/redux/todos/features/todosSlice";

const ContentArea = (props: { slug: string }) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const todo = todos.find((todo) => todo.id === props.slug);
    setContent(todo?.content);
  }, []);

  function changeContentHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    dispatch(changeContent({ id: props.slug, content: e.target.value }));
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
