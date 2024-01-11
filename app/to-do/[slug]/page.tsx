import { Box } from "@mui/material";
import React from "react";

import classes from "./../to-do.module.css";
import HeadingArea from "@/elements/ToDoRightSection/HeadingArea";
import ContentArea from "@/elements/ToDoRightSection/ContentArea";
import { useDispatch } from "react-redux";
import Header from "@/elements/ToDoRightSection/Header";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <Header slug={params.slug} />
      <hr />
      <HeadingArea slug={params.slug} />
      <hr />
      <ContentArea slug={params.slug} />
    </Box>
  );
};

export default page;
