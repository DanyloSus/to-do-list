//useState needs client render
"use client";

//import from libraries
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import * as Yup from "yup";

//internal imports
import CustomTextField from "@/elements/Form/TextField";
import Loading from "@/elements/Form/Loading";
import { handleGuest } from "@/lib/next-auth/guestMode";
import { regExp } from "../register/form";

const FormLogin = () => {
  //loading state
  const [isSigning, setIsRegistering] = useState(false);
  const [error, setError] = useState(""); // error state

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
      const res = await signIn("credentials", {
        username: value.username,
        password: value.password,
        redirect: false,
      }).catch((err) => console.log(err));

      if (res?.status !== 401 && !res?.ok) {
        // if res has errors
        setError("Something went wrong ;(");
        setIsRegistering(false);
        return;
      }

      if (res?.status === 401) {
        formik.setErrors({ username: true, password: true }); // ignore this error because it works withou spacing)
        setError("Username or password is wrong!");
        setIsRegistering(false);
        return;
      }

      router.replace("to-do");
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
          disabled={isSigning}
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
          disabled={isSigning}
        />
        {error ? (
          <Typography component="p" my={-1} color="error">
            {error}
          </Typography>
        ) : null}
        <Box
          display="flex"
          gap={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={3}>
            <Button
              variant="text"
              disabled={isSigning}
              onClick={() =>
                handleGuest({ setError, router, setLoading: setIsRegistering })
              }
            >
              Guest
            </Button>
            <Link href="/register">
              <Button variant="outlined" disabled={isSigning}>
                Register
              </Button>
            </Link>
          </Box>
          <Button variant="contained" type="submit" disabled={isSigning}>
            Login
          </Button>
          {isSigning ? <Loading /> : null}
        </Box>
      </FormControl>
    </form>
  );
};

export default FormLogin;
