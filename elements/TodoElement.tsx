import { TodoInfo } from "@/lib/features/todos/todosSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import classes from "./TodoElement.module.css";

const TodoElement = (props: TodoInfo) => {
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push(`/to-do/${props.id}`)}
      className={classes.TodoBlock}
    >
      <Typography
        component="h3"
        variant="h4"
        className={classes.TodoBlock_Heading}
      >
        {props.heading}
      </Typography>
      <Typography className={classes.TodoBlock_Content}>
        {props.content}
      </Typography>
    </Box>
  );
};

export default TodoElement;
