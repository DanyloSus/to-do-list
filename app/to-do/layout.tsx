"use client";

import { Box } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import store from "@/lib/store";
import TodoList from "@/elements/TodoList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
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
      </body>
    </html>
  );
}
