import React, { FC } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { dialogTitleStyles, CustomMuiDialogTitle } from "./styles";

interface IProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle: FC<IProps> = ({ id, onClose, children }: IProps) => {
  const classes = dialogTitleStyles();
  return (
    <CustomMuiDialogTitle>
      <Typography className={classes.dialogTitle}>{children}</Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <Close />
      </IconButton>
    </CustomMuiDialogTitle>
  );
};

export default DialogTitle;
