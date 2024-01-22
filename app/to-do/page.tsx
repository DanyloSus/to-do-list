//import from libraries
import { Box } from "@mui/material";

//import styles
import classes from "./to-do.module.css";

const Page = () => {
  return <Box p={2} overflow="hidden auto" className={classes.ToDoBox}></Box>;
};

export default Page;
