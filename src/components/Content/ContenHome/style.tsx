import { Box, styled, Typography } from "@material-ui/core";

export const BoxContent = styled(Box)({
  backgroundColor: "#fff",
  boxShadow: " 0px 3px 8px rgba(0, 0, 0, 0.24)",
  borderRadius: 4
});

export const Decriptions = styled(Typography)({
  fontSize: "22px",
  width: "90%",
  fontWeight: "bold",
  padding: "15px",
  letterSpacing: "1px",
  textAlign: 'center',
});

export const DecriptionsDetaial = styled(Typography)({
  fontSize: "15px",
  textAlign: 'center',
  marginBottom: 5
});
