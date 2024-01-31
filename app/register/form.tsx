//useState needs client render
"use client";

//import from libraries
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

//internal imports
import CustomTextField from "@/elements/Form/TextField";
import Loading from "@/elements/Form/Loading";
import { signIn } from "next-auth/react";

//regular expretion for check is latin
export const regExp = /^[a-zA-Z]$/;

const FormRegister = () => {
  //loading state
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  //get router
  const router = useRouter();

  //set formik
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
      setIsRegistering(true);

      const res = await axios({
        method: "post",
        data: { username: value.username, email: value.email },
        url: "/api/check",
      }).catch(() => {
        setIsRegistering(false);
        setError("Something went wrong ;(");
        return;
      });

      setError("");

      if (!res) {
        setIsRegistering(false);
        return;
      }

      if (res.data.user) {
        if (res.data.email) {
          // set if email exists
          formik.setErrors({ email: "Email already exists" });
        } else {
          // set if username exists
          formik.setErrors({ username: "Username already exists" });
        }

        setIsRegistering(false);
        return;
      }

      axios({ method: "post", data: value, url: "/api/register" })
        .then((res) => {
          router.replace("login");
        })
        .catch(() => {
          setIsRegistering(false);
          setError("Something went wrong ;(");
          return;
        });
    },
  });

  const handleGuest = async () => {
    setIsRegistering(true);
    const res = await signIn("credentials", {
      username: "admin",
      password: "eKmvL3954dbpmTyrcnFN",
      redirect: false,
    }).catch((err) => console.log(err));

    if (!res?.ok) {
      setError("Something went wrong ;(");
      setIsRegistering(false);
      return;
    }

    router.replace("to-do");
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 3,
          p: 1,
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
        {error ? (
          <Typography color="error" component="h6">
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
              disabled={isRegistering}
              onClick={handleGuest}
            >
              Guest
            </Button>
            <Link href="/login">
              <Button variant="outlined" disabled={isRegistering}>
                Login
              </Button>
            </Link>
          </Box>
          <Button variant="contained" type="submit" disabled={isRegistering}>
            Register
          </Button>
          {isRegistering ? <Loading /> : null}
        </Box>
      </FormControl>
    </form>
  );
};

export default FormRegister;
