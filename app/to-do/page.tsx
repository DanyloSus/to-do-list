import { Box } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { grey } from "@mui/material/colors";
import React from "react";

import classes from "./to-do.module.css";

const page = () => {
  return (
    <Box p={2} overflow="hidden auto" className={classes.ToDoBox}>
      <TextareaAutosize
        placeholder="Heading of your to-do"
        className={classes.ToDoBox_Heading}
      />
      <hr />
      <TextareaAutosize
        placeholder="Content of your to-do"
        className={classes.ToDoBox_Content}
      />
    </Box>
  );
};

export default page;
