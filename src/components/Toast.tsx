import React from "react";
import { Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IToastProps {
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  open: boolean;
  timeout?: number;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
}

export const Toast = ({
  handleClose,
  open,
  message,
  timeout,
  severity,
}: IToastProps) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={timeout ?? 2000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={severity ?? "success"}
        sx={{ width: "100%" }}
        action={action}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
