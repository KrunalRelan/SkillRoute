// GenericModal.tsx
import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions: {
    text: string;
    variant: "text" | "contained" | "outlined";
    color:
      | "primary"
      | "secondary"
      | "inherit"
      | "success"
      | "error"
      | "info"
      | "warning";
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  }[];
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

export const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
  maxWidth,
  fullWidth,
}) => {
  // This handler prevents closing the modal when clicking the backdrop or pressing escape.
  const handleClose = (
    event: React.SyntheticEvent,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      disableEscapeKeyDown
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {title}
          {/* Cross (close) button */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant}
            color={action.color}
            disabled={action.disabled}
            startIcon={action.isLoading ? <CircularProgress size={16} /> : null}
          >
            {action.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
