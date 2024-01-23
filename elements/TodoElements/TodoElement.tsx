//internal imports
import { TodoInfo } from "@/lib/redux/todos/features/todosSlice";
import classes from "./TodoElement.module.css";

//import from libraries
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  disabled: boolean;
  setDisabled: (state: boolean) => void;
  router: AppRouterInstance;
  params: Params;
  searchParams: ReadonlyURLSearchParams;
};

const TodoElement = (props: TodoInfo & Props) => {
  return (
    <Button
      onClick={() => {
        props.setDisabled(true);
        props.router.push(
          `/to-do/${props._id}${
            props.searchParams.get("filter")
              ? `?filter=${props.searchParams.get("filter")}`
              : ""
          }`
        );
        props.setDisabled(false);
      }}
      className={classes.TodoBlock}
      sx={
        props.params.id === props._id
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
