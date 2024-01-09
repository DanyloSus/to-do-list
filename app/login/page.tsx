import { ThemeProvider } from "@mui/material";
import React from "react";
import FormLogin from "./form";
import { theme } from "../page";
import Form from "@/elements/Form";

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Form heading="Login">
        <FormLogin />
      </Form>
    </ThemeProvider>
  );
};

export default LoginPage;
