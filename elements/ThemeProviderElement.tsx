//createTheme needs client side render
"use client";

//internal imports
import { ChildrenType } from "@/types/types";
import store, { Store } from "@/lib/redux/store";

//import from libraries
import { Provider, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import CssBaseline from "@mui/material/CssBaseline";

// create light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[900],
    },
  },
});

// create dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: grey[900],
    },
    text: {
      primary: grey[100],
    },
    primary: {
      main: grey[100],
    },
    secondary: {
      main: grey[900],
    },
  },
});

// internal Element because useSelector need to be wrapped
const ThemeProviderInside = ({ children }: ChildrenType) => {
  const darkMode = useSelector((state: Store) => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

// wrapper of redux and themes
const ThemeProviderElement = ({ children }: ChildrenType) => {
  return (
    <Provider store={store}>
      <ThemeProviderInside>{children}</ThemeProviderInside>
    </Provider>
  );
};

export default ThemeProviderElement;
