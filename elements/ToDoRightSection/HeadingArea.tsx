//internal import of CSS module's classes
import classes from "@/app/to-do/to-do.module.css";

//import from libraries
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

//type of HeadingArea's props
type Props = {
  id: string;
  heading: string;
  setHeading: Dispatch<SetStateAction<string>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  darkMode: boolean;
  status: string;
};

const HeadingArea = (props: Props) => {
  //change heading's value
  function changeHeadingHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setHeading(e.target.value);
    props.setIsChanged(true);
  }

  return (
    <TextareaAutosize
      placeholder="Heading of your to-do"
      className={
        props.darkMode ? classes.ToDoBox_Heading__Dark : classes.ToDoBox_Heading
      }
      value={props.heading}
      onChange={changeHeadingHandler}
      disabled={
        props.disabled ||
        props.status === "completed" ||
        props.status === "deleted"
      }
    />
  );
};

export default HeadingArea;
