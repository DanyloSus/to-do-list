"use client";

//import from libraries
import { Box } from "@mui/material";

//import styles
import classes from "./to-do.module.css";
import ReturnButton from "@/elements/ToDoRightSection/ReturnButton";

const Page = () => {
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <ReturnButton disabled={false} />
    </Box>
  );
};

export default Page;
