//internal imports
import { ChildrenType } from "@/types/types";
//import from libraries
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import ThemeProviderElement from "../ThemeProviderElement";

// type of Form's props
type Props = {
  heading: String;
};

// Form's window element
const Form = (props: Props & ChildrenType) => {
  return (
    <ThemeProviderElement>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        border={`1px solid ${grey[400]}`}
        p={5}
        borderRadius={3}
        width="500px"
        sx={{ transform: "translate(-50%,-50%)" }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          component="h1"
          textAlign="center"
        >
          {props.heading}
        </Typography>
        {props.children}
      </Box>
    </ThemeProviderElement>
  );
};

export default Form;
