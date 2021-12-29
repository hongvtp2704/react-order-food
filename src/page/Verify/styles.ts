import { styled } from "@material-ui/styles";
import { Button } from "@material-ui/core";

export const RedirectButton = styled(Button)({
  background: "#f26722",
  color: "#FFF",
  fontSize: 18,
  padding: "8px 16px",
  display: "block",
  position: "absolute",
  right: "10%",
  bottom: "10%",
  "&:hover": {
    background: "var(--color-button-hover)",
  },
});

export const Container = styled("div")({
  height: "100vh",
  width: "100%",
  backgroundImage: 'url("/Verify.png")',
  backgroundRepeat: "no-repeat",
  backgroundPositionX: "center",
  backgroundPositionY: "30%",
  position: "relative",
});
