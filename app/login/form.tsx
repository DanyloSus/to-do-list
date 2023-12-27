"use client";

import TextField from "@mui/material/TextField";
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
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
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
          label="Name"
          value={formik.values.name}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
          onChange={formik.handleChange}
          required
          type="text"
          name="name"
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
        <Box display="flex" gap={3} alignItems="center" justifyContent="center">
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          <Button variant="outlined" type="submit">
            Login
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default FormLogin;
