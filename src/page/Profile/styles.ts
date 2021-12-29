import { makeStyles } from "@material-ui/core";

export default makeStyles({
  input: {
    display: "block",
    marginBottom: 10,
  },
  button: {
    background: "var(--color-primary)",
    color: "#FFF",
    marginBottom: 15,
    marginRight: 5,
    "&:hover": {
      background: "var(--color-button-hover)",
    },
  },
  history: {
    marginBottom: 10,
  },
  productWrapper: {
    marginBottom: 10,
  },
});
