// media query needs USR
"use client";

//import from libraries
import { Box, useMediaQuery } from "@mui/material";

//internal imports
import classes from "./to-do.module.css";
import ReturnButton from "@/elements/ToDoRightSection/ReturnButton";

const Page = () => {
  const mediaQuery = useMediaQuery("(max-width: 600px)");
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      {mediaQuery ? <ReturnButton disabled={false} /> : null}
    </Box>
  );
};

export default Page;
