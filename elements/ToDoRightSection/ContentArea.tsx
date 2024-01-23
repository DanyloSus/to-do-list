//internal import of CSS module's classes
import classes from "@/app/to-do/to-do.module.css";

//import from libraries
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

//type of ContentArea's props
interface Props {
  id: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  status: string;
}

const ContentArea = (props: Props) => {
  //change content's value
  function changeContentHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setContent(e.target.value);
    props.setIsChanged(true);
  }

  return (
    <TextareaAutosize
      placeholder="Content of your to-do"
      className={classes.ToDoBox_Content}
      value={props.content}
      onChange={changeContentHandler}
      disabled={
        props.disabled ||
        props.status === "completed" ||
        props.status === "deleted"
      }
    />
  );
};

export default ContentArea;
