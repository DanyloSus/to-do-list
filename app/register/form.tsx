"use client";

import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import CustomTextField from "@/elements/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const regExp = /^[a-zA-Z]$/;

const FormRegister = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
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
      email: Yup.string()
        .required()
        .test("latin", "Must be latin characters", (val) => !regExp.test(val))
        .test("not email", "Must have @", (val) => val.includes("@")),
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
          label="Email"
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          onChange={formik.handleChange}
          required
          type="email"
          name="email"
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
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default FormRegister;
