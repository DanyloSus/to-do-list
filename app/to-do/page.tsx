"use client";

import { Box } from "@mui/material";
import React from "react";

import classes from "./to-do.module.css";

const Page = () => {
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </Box>
  );
};

export default Page;
