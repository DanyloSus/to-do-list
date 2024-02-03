//internal imports
import { regExp } from "@/app/register/form";
import { Store } from "@/lib/redux/store";
import { setDarkMode as setDarkModeRedux } from "@/lib/redux/darkMode/features/modeSlice";
import { setDisabled } from "@/lib/redux/disabled/features/disabledSlice";
import SwitchCustom from "../Switch";
import CustomTextField from "../Form/TextField";

//import from libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";

// props of setting's dialog
type Props = {
  open: boolean;
  handleClose: () => void;
};

// Formik's values
type FormikValues = {
  password: string;
  newPassword: string;
  newPasswordAgain: string;
};

const SettingsDialog = (props: Props) => {
  const [isDeleting, setIsDeleting] = useState(false); // loading while deleting

  // get values of redux
  const disabled = useSelector((state: Store) => state.disbled);
  const isDarkMode: boolean = useSelector((state: Store) => state.darkMode);

  const session = useSession(); // get session
  const dispatch = useDispatch();

  // set formik of changing password
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

  // function on submit
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
      .then((res) => {
        dispatch(setDisabled(false));
        if (res.status !== 422) {
          props.handleClose();
        }
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

  // function of deleting
  const handleDelete: () => void = () => {
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

  // function of changing dark mode
  const handleChangeMode = () => {
    dispatch(setDarkModeRedux(!isDarkMode));
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <hr />
        <Typography component="h4">Dark mode:</Typography>
        <SwitchCustom checked={isDarkMode} onChange={handleChangeMode} />
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
            if (
              session.data?.user.email === "admin@admin" ||
              (!formik.values.newPassword &&
                !formik.values.newPasswordAgain &&
                !formik.values.password)
            ) {
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
