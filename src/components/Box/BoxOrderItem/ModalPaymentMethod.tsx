import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Radio, Typography } from "@material-ui/core";

import { useStyles } from "./style";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 250,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type Props = {
  open: boolean;
  onClose: () => void;
  onClickPayment: (paymentMethod: string) => void;
};

export default function CustomizedDialogs({
  onClose,
  open,
  onClickPayment,
}: Props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Choose method
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            <Radio checked />
            Cash
          </Typography>
          <Typography>
            <Radio disabled />
            Zalopay
          </Typography>
          <Typography>
            <Radio disabled />
            Momo
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              onClickPayment("cash");
            }}
            color="primary"
            className={classes.checkoutButton}
          >
            Payment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
