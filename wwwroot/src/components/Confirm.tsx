import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IConfirmProps } from "../interfaces";

class Confirm extends React.Component<IConfirmProps> {
  render() {
    return (
      <Dialog
        open={this.props.visible || false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.onClose && this.props.onClose(true)}
            color="primary"
            autoFocus
          >
            OK
          </Button>
          <Button
            onClick={() => this.props.onClose && this.props.onClose(false)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Confirm;
