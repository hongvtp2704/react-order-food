import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(() =>
  createStyles({
    title: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 20,
    },
    orderWrapper: {
      marginBottom: 17
    },
    orderDate: {
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.5)",
      fontWeight: 400,
      display: "flex",
      alignItems: "center",
      marginBottom: 5,
    },
    dateIcon: {
      width: 14,
      height: 14,
      marginRight: 5,
      color: "rgba(0, 0, 0, 0.5)",
    },
    price: {
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.4)",
      fontWeight: 400,
    },
    nameStore: {
      marginBottom: 3,
    },
    contentWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    },
    arrowRightIcon: {
      width: 16,
      height: 16,
    }
  })
);
