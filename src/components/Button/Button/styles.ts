import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(() =>
  createStyles({
    button: {
      background: "var(--color-primary)",
      color: "#FFF",
      "&:hover": {
        background: "var(--color-button-hover)",
      },
    },
  })
);
