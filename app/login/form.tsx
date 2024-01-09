"use client";

import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import CustomTextField from "@/elements/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const regExp = /^[a-zA-Z]$/;

const FormLogin = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required()
        .test("latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "len",
          "Must be from 2 to 12 characters",
          (val) => val.length >= 2 && val.length <= 12
        ),
      password: Yup.string()
        .required()
        .test("latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "len",
          "Must be from 8 to 20 characters",
          (val) => val.length >= 8 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    onSubmit: () => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}
      >
        <CustomTextField
          label="Username"
          value={formik.values.username}
          error={Boolean(formik.errors.username)}
          helperText={formik.errors.username}
          onChange={formik.handleChange}
          required
          type="text"
          name="username"
        />
        <CustomTextField
          label="Password"
          value={formik.values.password}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          onChange={formik.handleChange}
          required
          type="password"
          name="password"
        />
        <Box
          display="flex"
          gap={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={3}>
            <Link href="/">
              <Button variant="text">Guest</Button>
            </Link>
            <Link href="/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </Box>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default FormLogin;
