//internal imports
import { ChildrenType } from "@/types/types";
//import from libraries
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import { Wrapper } from "./FormWraper";

// type of Form's props
type Props = {
  heading: String;
};

// Form's window element
const Form = (props: Props & ChildrenType) => {
  return (
    <Wrapper>
      <Typography
        variant="h4"
        fontWeight="700"
        component="h1"
        textAlign="center"
      >
        {props.heading}
      </Typography>
      {props.children}
    </Wrapper>
  );
};

export default Form;
