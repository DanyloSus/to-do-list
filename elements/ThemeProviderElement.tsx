//createTheme needs client side render
"use client";

//internal imports
import { ChildrenType } from "@/types/types";

//import from libraries
import { createTheme, ThemeProvider } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider, useSelector } from "react-redux";
import store, { Store } from "@/lib/redux/store";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: grey[900],
    },
  },
});

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

const ThemeProviderInside = ({ children }: ChildrenType) => {
  const darkMode = useSelector((state: Store) => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const ThemeProviderElement = ({ children }: ChildrenType) => {
  return (
    <Provider store={store}>
      <ThemeProviderInside>{children}</ThemeProviderInside>
    </Provider>
  );
};

export default ThemeProviderElement;
