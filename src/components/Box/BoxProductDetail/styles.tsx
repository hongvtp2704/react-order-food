import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      background: "#FFF",
      padding: 20,
      textAlign: 'center'
    },
    storeImg: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: "1px solid #000",
      padding: 2,
      display: "inline-block",
      margin: "0 auto",
      marginBottom: 10
    },
    storeName: {
      fontSize: 20,
      fontWeight: 700
    },
    address: {
      display: "flex",
      alignItems: "center",
      fontSize: 14,
      color: "#bdbdbd",
      justifyContent: "center"
    },
    icon: {
      width: 15,
      height: 15,
      color: "var(--color-primary)"
    }
  })
);


