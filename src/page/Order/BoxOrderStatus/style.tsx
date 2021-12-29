import { Box, Typography, withTheme } from "@material-ui/core";
import {
  createStyles,
  Theme,
  makeStyles,
  styled,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orderStatus: {
      fontWeight: 600,
      padding: 10,
      fontSize: 18,
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #d8d8d8",
      height: 200,
      marginBottom: 10,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        height: 400,
      },
    },
    storeAvatar: {
      width: "40%",
    },
    restaurantName: {
      fontSize: 23,
      fontWeight: "bold",
      padding: "0 0 10px 10px",
    },
    boxMap: {
      width: "100%",
      height: "100%",
    },
    restaurantBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },
  })
);

export const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #d8d8d8",
});

export const BoxInfoStore = styled(withTheme(Box))((props) => ({
  width: "50%",
  display: "flex",
  justifyContent: "space-betweens",
  height: "100%",
  [props.theme.breakpoints.down("sm")]: {
    width: "72%",
    height: "50%",
    marginRight: 10,
  },
}));

export const BoxGoogleMap = styled(withTheme(Box))((props) => ({
  display: "flex",
  justifyContent: "space-betweens",
  alignItems: "flex-start",
  width: "35%",
  height: "100%",
  [props.theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "40%",
  },
}));

export const InfoText = styled(Typography)({
  fontSize: 15,
  paddingLeft: 5,
});

export const Info = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "5px 5px 5px 10px",
});
