//useState needs client side
"use client";

//import from libraries
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//import from libraries
import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import Header from "@/elements/ToDoRightSection/Header";
import { ParamsIdType } from "@/types/types";
import { Store } from "@/lib/redux/store";

const Page = ({ params }: ParamsIdType) => {
  //state for checking is toDo thing was changed
  const [isChanged, setIsChanged] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  //get all todos
  const todos = useSelector((state: Store) => state.todos);

  useEffect(() => {
    //filter todo by id
    const todo = todos.find((todo) => todo._id === params.id);

    //set content of todo
    setHeading(todo?.heading || "");
    setContent(todo?.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <Header
        id={params.id}
        heading={heading}
        content={content}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />
      <hr />
      <HeadingArea
        id={params.id}
        heading={heading}
        setIsChanged={setIsChanged}
        setHeading={setHeading}
      />
      <hr />
      <ContentArea
        id={params.id}
        content={content}
        setIsChanged={setIsChanged}
        setContent={setContent}
      />
    </Box>
  );
};

export default Page;
