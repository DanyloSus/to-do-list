//a lot of things need USR
"use client";

//import from libraries
import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { Box } from "@mui/material";

//internal imports
import store from "@/lib/redux/store";
import { ChildrenType } from "@/types/types";
import TodoList from "@/elements/TodoElements/TodoList";
import ThemeProviderElement from "@/elements/ThemeProviderElement";
import Loading from "@/elements/Form/Loading";
import { Wrapper } from "@/elements/ToDoRightSection/Wrapper";
import LoadingEllement from "./loading";

export default function RootLayout({ children }: ChildrenType) {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  return (
    <Suspense fallback={<LoadingEllement />}>
      <Provider store={store}>
        {loading ? (
          <>
            <Loading />
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
              <Wrapper>{children}</Wrapper>
            </Box>
          </ThemeProviderElement>
        )}
      </Provider>
    </Suspense>
  );
}
