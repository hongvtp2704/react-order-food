import { styled } from "@material-ui/styles";
import {
  Button,
  LinearProgress,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const Wrapper = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const LoginWrapper = styled("div")({
  width: 350,
  borderRadius: 6,
  boxShadow:
    "0px 0px 1px rgba(12, 26, 75, 0.1), 0px 20px 24px rgba(20, 37, 63, 0.06)",
  overflow: "hidden",
});

export const LoginButton = styled(Button)({
  background: "#f26722",
  color: "#FFF",
  display: "block",
  width: "100%",
  "&:hover": {
    background: "var(--color-button-hover)",
  },
});

export const ProcessLine = styled(LinearProgress)({
  background: "#FFF",
  "& .MuiLinearProgress-barColorPrimary": {
    background: "var(--color-primary)",
  },
});

export const InputField = styled(TextField)({
  display: "block",
  width: "100%",
  marginBottom: 18,
  "& input, div": {
    display: "block",
    width: "100%",
  },
  "& div:after": {
    borderBottom: "none",
  },
  "& div:before": {
    borderBottom: "none",
  },
});

export const FormWrapper = styled("div")({
  padding: "30px 20px",
  paddingBottom: "20px",
});

export const Subtext = styled(Typography)({
  color: "#000",
  fontSize: 14,
  textAlign: "center",
});

export const SubtextForgotPass = styled(Typography)({
  color: "#000",
  fontSize: 14,
  textAlign: "center",
  marginTop: 15,
});

export const LinkSignUp = styled("span")({
  color: "var(--color-primary)",
});

export const LinkForgotPass = styled("span")({
  color: "var(--color-primary)",
});

export const CircleLoading = styled(CircularProgress)({
  color: "var(--color-primary)",
});

export const CustomAlert = styled(Alert)({
  width: 300,
  margin: "10px auto",
});

export const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
});
