"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/redux/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ContentArea = (props: {
  slug: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === props.slug);
    setContent(todo?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeContentHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
