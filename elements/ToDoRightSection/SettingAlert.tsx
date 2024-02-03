//import from libraries
import { Dispatch, SetStateAction } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

// props of settings dialog
type Props = {
  handleClose: () => void;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setDateTime: (e: Dayjs | null) => void;
  dateTime: Date | null | undefined;
};

const SettingsAlert = (props: Props) => {
  // set minimum date
  const minDateTime = dayjs(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  )
    .set("hour", new Date().getHours())
    .set("minute", new Date().getMinutes());

  return (
    <Dialog open={props.isOpen}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            minDateTime={minDateTime}
            componentsProps={{ actionBar: { actions: [] } }}
            onChange={(e) => {
              props.setIsChanged(true);
              props.setDateTime(e);
            }}
            value={props.dateTime === null ? null : dayjs(props.dateTime)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setDateTime(null);
            props.handleClose();
          }}
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          onClick={props.handleClose}
          variant="contained"
          autoFocus
          disabled={
            props.dateTime &&
            new Date(minDateTime.toString()).getTime() >
              props.dateTime.getTime()
              ? true
              : false
          }
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsAlert;
