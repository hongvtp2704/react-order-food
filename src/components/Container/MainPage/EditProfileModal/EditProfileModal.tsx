import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import { Button } from "components";
import styles from "./styles";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditProfileModal: FC<Props> = ({ open, onClose }: Props) => {
  const classes = styles();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogContent className={classes.wrapper}>
        <DialogContentText>profile</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button title="Edit profile" onClick={() => {}} isLoading={false} />
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
