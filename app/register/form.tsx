"use client";

import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import CustomTextField from "@/elements/Form/TextField";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export const regExp = /^[a-zA-Z]$/;

const FormRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
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
      surname: Yup.string()
        .required()
        .test("latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "len",
          "Must be from 2 to 12 characters",
          (val) => val.length >= 2 && val.length <= 12
        ),
      username: Yup.string()
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
    onSubmit: async (value) => {
      console.log("sadasd");

      setIsRegistering(true);

      const res = await axios({
        method: "post",
        data: { username: value.username, email: value.email },
        url: "/api/check",
      });

      console.log(res);

      if (res.data.user) {
        if (res.data.email) {
          formik.setErrors({ email: "Email already exists" });
        } else {
          formik.setErrors({ username: "Username already exists" });
        }

        setIsRegistering(false);
        return;
      }

      axios({ method: "post", data: value, url: "/api/register" })
        .catch((err) => console.log(err))
        .finally(() => {
          router.replace("login");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 3,
        }}
      >
        <Box display="flex" gap={3}>
          <CustomTextField
            label="Name"
            value={formik.values.name}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            onChange={formik.handleChange}
            required
            disabled={isRegistering}
            type="text"
            name="name"
          />
          <CustomTextField
            label="Surname"
            value={formik.values.surname}
            error={Boolean(formik.errors.surname)}
            helperText={formik.errors.surname}
            onChange={formik.handleChange}
            required
            disabled={isRegistering}
            type="text"
            name="surname"
          />
        </Box>
        <CustomTextField
          label="Username"
          value={formik.values.username}
          error={Boolean(formik.errors.username)}
          helperText={formik.errors.username}
          onChange={formik.handleChange}
          required
          disabled={isRegistering}
          type="text"
          name="username"
        />
        <CustomTextField
          label="Email"
          value={formik.values.email}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          onChange={formik.handleChange}
          required
          disabled={isRegistering}
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
          disabled={isRegistering}
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
            <Link href="/to-do">
              <Button variant="text" disabled={isRegistering}>
                Guest
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outlined" disabled={isRegistering}>
                Login
              </Button>
            </Link>
          </Box>
          <Button variant="contained" type="submit" disabled={isRegistering}>
            Register
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default FormRegister;
