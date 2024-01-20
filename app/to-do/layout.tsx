"use client";

import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import store from "@/lib/redux/store";
import TodoList from "@/elements/TodoElements/TodoList";
import { theme } from "../page";
import { ChildrenType } from "@/types/types";

export default function RootLayout({ children }: ChildrenType) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
