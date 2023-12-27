import { Box, ThemeProvider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import FormLogin from "./form";
import { theme } from "../page";

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        bgcolor={grey[300]}
        p={5}
        borderRadius={3}
        sx={{ transform: "translate(-50%,-50%)" }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          component="h1"
          textAlign="center"
        >
          Login
        </Typography>
        <FormLogin />
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
