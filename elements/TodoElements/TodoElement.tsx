//internal imports
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import classes from "./TodoElement.module.css";

//import from libraries
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useParams, useRouter } from "next/navigation";

type Props = {
  disabled: boolean;
  setDisabled: (state: boolean) => void;
};

const TodoElement = (props: TodoInfo & Props) => {
  // get router
  const router = useRouter();
  // get params
  const params = useParams();

  return (
    <Button
      onClick={() => {
        props.setDisabled(true);
        router.push(`/to-do/${props._id}`);
        props.setDisabled(false);
      }}
      className={classes.TodoBlock}
      sx={
        params.id === props._id
          ? {
              backgroundColor: `${grey[300]} !important`,
            }
          : {}
      }
      disabled={props.disabled}
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
    </Button>
  );
};

export default TodoElement;
