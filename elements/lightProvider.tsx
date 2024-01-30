import { ChildrenType } from "@/types/types";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./ThemeProviderElement";

const LightProvider = ({ children }: ChildrenType) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default LightProvider;
