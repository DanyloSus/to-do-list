//useState needs client render
"use client";

//import from libraries
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

//internal imports
import { regExp } from "../register/form";
import CustomTextField from "@/elements/Form/TextField";

const FormLogin = () => {
  //loading state
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(false);

  //get router
  const router = useRouter();

  //set formik
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
    onSubmit: async (value) => {
      setIsRegistering(true);
      try {
        const res = await signIn("credentials", {
          username: value.username,
          password: value.password,
          redirect: false,
        }).catch((err) => console.log(err));

        if (res?.error) {
          // if res has errors
          formik.setErrors({ username: true, password: true }); // ignore this error because it works withou spacing)
          setError(true);
          setIsRegistering(false);
          return;
        }

        router.replace("to-do");
      } catch (error) {
        console.log(error);
        setIsRegistering(false);
      }
    },
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
          disabled={isRegistering}
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
          disabled={isRegistering}
        />
        {error ? (
          <Typography component="p" my={-1} color="error">
            Username or password is uncorrect!
          </Typography>
        ) : null}
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
            <Link href="/register">
              <Button variant="outlined" disabled={isRegistering}>
                Register
              </Button>
            </Link>
          </Box>
          <Button variant="contained" type="submit" disabled={isRegistering}>
            Login
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default FormLogin;
