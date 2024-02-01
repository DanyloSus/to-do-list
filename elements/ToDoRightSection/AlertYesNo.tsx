//import from libraries
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// props of setting's dialog
type Props = {
  handleClose: () => void;
  handleDo: () => void;
  isOpen: boolean;
  title: string;
  content: string;
};

const AlertDeleting = (props: Props) => {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
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
