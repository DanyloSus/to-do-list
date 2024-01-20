"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import Header from "@/elements/ToDoRightSection/Header";
import { ParamsIdType } from "@/types/types";

const Page = ({ params }: ParamsIdType) => {
  const [isChanged, setIsChanged] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

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
        setIsChanged={setIsChanged}
        setHeading={setHeading}
      />
      <hr />
      <ContentArea
        id={params.id}
        setIsChanged={setIsChanged}
        setContent={setContent}
      />
    </Box>
  );
};

export default Page;
