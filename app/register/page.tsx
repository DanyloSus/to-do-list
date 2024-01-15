import { ThemeProvider } from "@mui/material";
import React from "react";
import FormRegister from "./form";
import { theme } from "../page";
import Form from "@/elements/Form/Form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const RegistrationPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/to-do");

  return (
    <ThemeProvider theme={theme}>
      <Form heading="Register">
        <FormRegister />
      </Form>
    </ThemeProvider>
  );
};

export default RegistrationPage;
