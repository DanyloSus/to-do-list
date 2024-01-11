import { TodoInfo } from "@/lib/features/todos/todosSlice";
import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import classes from "./TodoElement.module.css";
import { grey } from "@mui/material/colors";

const TodoElement = (props: TodoInfo) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Box
      onClick={() => router.push(`/to-do/${props.id}`)}
      className={classes.TodoBlock}
      sx={
        params.slug === props.id
          ? { backgroundColor: `${grey[300]} !important` }
          : {}
      }
    >
      <Typography
        component="h3"
        variant="h4"
        className={classes.TodoBlock_Heading}
      >
        {props.heading || "Heading"}
      </Typography>
      <Typography className={classes.TodoBlock_Content}>
        {props.content || "Content"}
      </Typography>
    </Box>
  );
};

export default TodoElement;
