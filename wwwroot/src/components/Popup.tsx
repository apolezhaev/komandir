import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IPopupProps, PopupResult } from "../interfaces";

export function Popup(props: IPopupProps) {
  const { minWidth, minHeight, title, visible, onClose } = props;
  const style = {
    minWidth: minWidth || 400,
    minHeight: minHeight || 80
  };
  return (
    <Dialog
      open={visible || false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={style}>
        <DialogContentText>{props.children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose && onClose(PopupResult.OK)}
          color="primary"
          autoFocus
        >
          OK
        </Button>
        <Button
          onClick={() => onClose && onClose(PopupResult.Cancel)}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
