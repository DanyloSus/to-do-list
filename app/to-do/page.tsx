// media query needs USR
"use client";

//import from libraries
import { Box, Typography, useMediaQuery } from "@mui/material";

//internal imports
import classes from "./to-do.module.css";
import ReturnButton from "@/elements/ToDoRightSection/ReturnButton";

const Page = () => {
  const mediaQuery = useMediaQuery("(max-width: 600px)");
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      {mediaQuery ? <ReturnButton disabled={false} /> : null}
      <Box textAlign="center" width="100%" mt={10}>
        <Typography component="h1">
          Create your first ToDo or open an existing one
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;
