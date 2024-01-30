//internal imports
import Loading from "@/elements/Form/Loading";
import TypingElement from "@/elements/TypingElement";
import { authOptions } from "@/lib/next-auth/authOptions";

//import from libraries
import { Box, Button, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import PageButtons from "./pageButtons";
import PagesLink from "./pagesLink";

const MainPage = async () => {
  //get session
  const session = await getServerSession(authOptions);

  if (session) redirect("/to-do"); // if user is signed, then redirect them to to-do list page but deleting in history /register

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Box maxWidth="966px" textAlign="center">
        <TypingElement />
        <Typography my="1rem">
          App by <a href="https://github.com/DanyloSus">Sushko Danylo</a>
        </Typography>
        <PageButtons />
      </Box>
      <PagesLink />
    </Box>
  );
};

export default MainPage;
