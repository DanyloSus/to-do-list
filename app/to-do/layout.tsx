//useEffect in TodoList needs client side rendering
"use client";

//import from libraries
import { Box, Typography } from "@mui/material";
import { Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//internal imports
import store from "@/lib/redux/store";
import TodoList, { setToDosHandle } from "@/elements/TodoElements/TodoList";
import ThemeProviderElement from "@/elements/ThemeProviderElement";
import { ChildrenType } from "@/types/types";

export default function RootLayout({ children }: ChildrenType) {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  return (
    <Provider store={store}>
      {loading ? (
        <>
          <Typography>Loading...</Typography>
          <TodoList
            setLoading={setLoading}
            session={session}
            loading={loading}
          />
        </>
      ) : (
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
            <TodoList
              setLoading={setLoading}
              session={session}
              loading={loading}
            />
            <Box width="100%" height="100vh" ml="365px">
              {children}
            </Box>
          </Box>
        </ThemeProviderElement>
      )}
    </Provider>
  );
}
