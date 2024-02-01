// internal imports
import { lightTheme } from "./ThemeProviderElement";
import { ChildrenType } from "@/types/types";

//import from libraries
import { ThemeProvider } from "@mui/material/styles";

// wrapper for light theme
const LightProvider = ({ children }: ChildrenType) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default LightProvider;
