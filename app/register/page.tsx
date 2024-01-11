import { ThemeProvider } from "@mui/material";
import React from "react";
import FormRegister from "./form";
import { theme } from "../page";
import Form from "@/elements/Form/Form";

const RegistrationPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Form heading="Register">
        <FormRegister />
      </Form>
    </ThemeProvider>
  );
};

export default RegistrationPage;
