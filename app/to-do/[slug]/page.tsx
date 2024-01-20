"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";

import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import Header from "@/elements/ToDoRightSection/Header";

const Page = ({ params }: { params: { slug: string } }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <Header
        slug={params.slug}
        heading={heading}
        content={content}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />
      <hr />
      <HeadingArea
        slug={params.slug}
        setIsChanged={setIsChanged}
        setHeading={setHeading}
      />
      <hr />
      <ContentArea
        slug={params.slug}
        setIsChanged={setIsChanged}
        setContent={setContent}
      />
    </Box>
  );
};

export default Page;
