import { FC } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { MainPageTemplate } from "components";

import styles from "./styles";


const Profile: FC = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <MainPageTemplate>
      <TextField className={classes.input} fullWidth label="New password" />
      <Button variant="contained" className={classes.button}>
        Save
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          sessionStorage.clear();
          history.push("/login");
        }}
      >
        Log out
      </Button>
      <Typography className={classes.history} variant="h4">
        History
      </Typography>
    </MainPageTemplate>
  );
};

export default Profile;
