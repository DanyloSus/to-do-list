import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const CustomTextField = styled(TextField)({
  backgroundColor: "white",
  borderRadius: "1rem",
  width: "100%",
  "& > .MuiFormHelperText-root": {
    width: "100%",
    margin: "0 0 0 0",
  },
  "& .MuiInputBase-input": {
    padding: "1rem",
  },
});

export default CustomTextField;
