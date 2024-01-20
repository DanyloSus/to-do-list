//useEffect in TodoList needs client side rendering
"use client";

//import from libraries
import { Box } from "@mui/material";
import { Provider } from "react-redux";

//internal imports
import store from "@/lib/redux/store";
import TodoList from "@/elements/TodoElements/TodoList";
import ThemeProviderElement from "@/elements/ThemeProviderElement";
import { ChildrenType } from "@/types/types";

export default function RootLayout({ children }: ChildrenType) {
  return (
    <ThemeProviderElement>
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Provider store={store}>
          <TodoList />
          <Box width="100%" height="100vh" ml="365px">
            {children}
          </Box>
        </Provider>
      </Box>
    </ThemeProviderElement>
  );
}
