import { Button } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export const CustomButton = styled(Button)({
  border: "1px solid var(--color-primary)",
  padding: "6px 12px",
  color: "#FFF",
  background: "var(--color-primary)",
  marginLeft: 8,
  "&:hover": {
    background: "var(--color-primary)",
  },
});
