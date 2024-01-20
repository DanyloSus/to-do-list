//internal imports
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import classes from "./TodoElement.module.css";

//import from libraries
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useParams, useRouter } from "next/navigation";

const TodoElement = (props: TodoInfo) => {
  // get router
  const router = useRouter();
  // get params
  const params = useParams();

  return (
    <Box
      onClick={() => router.push(`/to-do/${props._id}`)}
      className={classes.TodoBlock}
      sx={
        params.id === props._id
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
