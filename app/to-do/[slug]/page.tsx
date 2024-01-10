import { Box } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import React from "react";

import classes from "./../to-do.module.css";
import { useSelector } from "react-redux";
import { Store } from "@/lib/store";
import HeadingArea from "@/elements/TextArea/HeadingArea";
import ContentArea from "@/elements/TextArea/ContentArea";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <HeadingArea slug={params.slug} />
      <hr />
      <ContentArea slug={params.slug} />
    </Box>
  );
};

export default page;
