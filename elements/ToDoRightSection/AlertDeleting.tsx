import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  handleClose: () => void;
  handleDo: () => void;
  isOpen: boolean;
};

const AlertDeleting = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you delete this ToDo, you never come back to its again
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} variant="outlined">
          No
        </Button>
        <Button onClick={props.handleDo} variant="contained" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDeleting;
