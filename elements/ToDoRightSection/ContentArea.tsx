//internal import of CSS module's classes
import classes from "@/app/to-do/to-do.module.css";

//import from libraries
import { Dispatch, SetStateAction } from "react";
import MDEditor from "@uiw/react-md-editor";
import { grey } from "@mui/material/colors";

//type of ContentArea's props
interface Props {
  id: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  darkMode: boolean;
  status: string;
}

const ContentArea = (props: Props) => {
  //change content's value
  function changeContentHandler(value?: string | undefined) {
    props.setContent(value ? value : "");
    props.setIsChanged(true);
  }

  return props.disabled ||
    props.status === "completed" ||
    props.status === "deleted" ? (
    <MDEditor.Markdown
      source={props.content}
      style={
        props.darkMode
          ? {
              backgroundColor: grey[900],
              color: "white !important"
            }
          : {}
      }
    />
  ) : (
    <MDEditor
      className={
        props.darkMode ? classes.ToDoBox_Content__Dark : classes.ToDoBox_Content
      }
      value={props.content}
      onChange={changeContentHandler}
      extraCommands={[]}
      preview="edit"
    />
  );
};

export default ContentArea;
