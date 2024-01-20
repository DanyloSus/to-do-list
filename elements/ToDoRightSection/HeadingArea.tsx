"use client";

import classes from "@/app/to-do/to-do.module.css";

import { Store } from "@/lib/redux/store";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeadingArea = (props: {
  slug: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const todos = useSelector((state: Store) => state.todos);
  const [content, setContent] = useState<string | undefined>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const todo = todos.find((todo) => todo._id === props.slug);
    setContent(todo?.heading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeHeadingHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
