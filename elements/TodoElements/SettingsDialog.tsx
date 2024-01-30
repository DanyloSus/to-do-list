import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik, useFormik } from "formik";
import CustomTextField from "../Form/TextField";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import * as Yup from "yup";
import { regExp } from "@/app/register/form";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/lib/redux/store";
import { setDisabled } from "@/lib/redux/disabled/features/disabledSlice";
import { ChangeEvent, useState } from "react";
import SwitchCustom from "../Switch";
import { setDarkMode as setDarkModeRedux } from "@/lib/redux/darkMode/features/modeSlice";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type FormikValues = {
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

const SettingsDialog = (props: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const disabled = useSelector((state: Store) => state.disbled);
  const session = useSession();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      newPasswordAgain: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .test("Latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "Len",
          "Must be from 8 to 20 characters",
          (val) => val.length >= 8 && val.length <= 20
        ),
      newPassword: Yup.string()
        .required()
        .test("Latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "Len",
          "Must be from 8 to 20 characters",
          (val) => val.length >= 8 && val.length <= 20
        ),
      newPasswordAgain: Yup.string()
        .required()
        .test("Latin", "Must be latin characters", (val) => !regExp.test(val))
        .test(
          "Len",
          "Must be from 8 to 20 characters",
          (val) => val.length >= 8 && val.length <= 20
        ),
    }),
    validateOnChange: false,
    onSubmit: (e) => handleSubmit(e),
  });

  const handleSubmit = (e: FormikValues) => {
    dispatch(setDisabled(true));
    if (e.newPassword !== e.newPasswordAgain) {
      formik.setErrors({
        newPasswordAgain: "Passwords doesn't equal",
        newPassword: true,
      });
      dispatch(setDisabled(false));
      return;
    } else if (e.newPassword === e.password) {
      formik.setErrors({
        password: true,
        newPassword: true,
        newPasswordAgain: "They are same",
      });
      dispatch(setDisabled(false));
      return;
    }
    axios
      .put("/api/user", {
        userId: session.data?.user.id,
        password: e.password,
        newPassword: e.newPassword,
      })
      .finally(() => {
        dispatch(setDisabled(false));
        props.handleClose();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          formik.setErrors({
            password: "Password isn't correct",
          });
        } else {
          formik.setErrors({
            password: true,
            newPassword: true,
            newPasswordAgain: "Something went wrong!",
          });
        }
        dispatch(setDisabled(false));
      });
  };

  const handleDelete = () => {
    dispatch(setDisabled(true));
    axios
      .delete(`/api/user?id=${session.data?.user.id}`)
      .finally(() => {
        dispatch(setDisabled(false));
        signOut();
      })
      .catch((err) => {
        console.log(err);
        dispatch(setDisabled(false));
        formik.setErrors({
          password: true,
          newPassword: true,
          newPasswordAgain: "Something went wrong!",
        });
      });
  };

  const handleChangeMode = () => {
    setIsDarkMode((val) => !val);
    dispatch(setDarkModeRedux(!isDarkMode));
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <hr />
        <Typography component="h4">Dark mode:</Typography>
        <SwitchCustom value={isDarkMode} onChange={handleChangeMode} />
        <hr />
        {session.data?.user.email === "admin@admin" ? null : (
          <form>
            <Box display="flex" flexDirection="column" gap={2} py={1}>
              <CustomTextField
                label="Current Password"
                value={formik.values.password}
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
                onChange={formik.handleChange}
                required
                type="password"
                name="password"
                disabled={disabled}
              />
              <CustomTextField
                label="New Password"
                value={formik.values.newPassword}
                error={Boolean(formik.errors.newPassword)}
                helperText={formik.errors.newPassword}
                onChange={formik.handleChange}
                required
                type="password"
                name="newPassword"
                disabled={disabled}
              />
              <CustomTextField
                label="Repeat New Password"
                value={formik.values.newPasswordAgain}
                error={Boolean(formik.errors.newPasswordAgain)}
                helperText={formik.errors.newPasswordAgain}
                onChange={formik.handleChange}
                required
                type="password"
                name="newPasswordAgain"
                disabled={disabled}
              />
            </Box>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        {session.data?.user.email === "admin@admin" ? null : (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setIsDeleting(true)}
              disabled={disabled}
            >
              Delete
            </Button>
            <Dialog open={isDeleting} onClose={() => setIsDeleting(false)}>
              <DialogContent>
                If You delete your account, You will not be able to access your
                To Do
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => setIsDeleting(false)}
                  disabled={disabled}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={disabled}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}

        <Button
          disabled={disabled}
          onClick={() => {
            dispatch(setDisabled(true));
            signOut().finally(() => dispatch(setDisabled(false)));
          }}
        >
          Log Out
        </Button>
        <Button
          onClick={() => {
            if (session.data?.user.email === "admin@admin") {
              props.handleClose();
            } else {
              formik.submitForm();
            }
          }}
          variant="contained"
          disabled={disabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
