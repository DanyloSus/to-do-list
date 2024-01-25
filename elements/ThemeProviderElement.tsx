//createTheme needs client side render
"use client";

//internal imports
import { ChildrenType } from "@/types";

//import from libraries
import { createTheme, ThemeProvider } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

const ThemeProviderElement = ({ children }: ChildrenType) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderElement;
