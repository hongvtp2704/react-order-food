import {
  createStyles,
  Theme,
  makeStyles,
  styled,
  withStyles,
} from "@material-ui/core/styles";
import {
  CardHeader,
  Typography,
  withTheme,
  Dialog,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  CheckboxProps,
  FormControl,
  RadioProps,
  Radio,
} from "@material-ui/core";

import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-start",
      height: 150,
      background: "none",
      border: "1px solid #808080",
      borderRadius: 8,
      padding: 5,
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        height: 380,
      },
    },
    avatar: {
      border: "1px solid var(--color-primary)",
      width: 30,
      height: 30,
    },
    media: {
      borderRadius: 8,
      width: 180,
      height: "100%",
      [theme.breakpoints.down("xs")]: {
        flexBasic: "50%",
        width: "100%"
      },
    },
    imgPlaceHolder: {
      borderRadius: 8,
      width: 180,
      height: "100%",
      background: '#bdbdbd',
      [theme.breakpoints.down("xs")]: {
        flexBasic: "50%",
        width: "100%"
      },
    },
    detail: {
      flex: "3 3 60%",
      display: "block",
      width: "60%",
      padding: 10,
      boxSizing: "border-box",
      margin: "auto",
      "&& .MuiCardHeader-root": {
        padding: 0,
      },
      [theme.breakpoints.down("md")]: {
        flexBasic: "35%",
      },
      [theme.breakpoints.down("sm")]: {
        flex: 0,
      },
      [theme.breakpoints.down("xs")]: {
        width: "80vw",
      },
    },
    addBtn: {
      background: "var(--color-primary)",
      color: "#FFFF",
      fontSize: "14px",
      padding: "6px 25px",
      "&:hover": {
        background: "var(--color-button-hover)",
      },
    },
    detailBtn: {
      border: "1px solid var(--color-primary)",
      color: "var(--color-primary)",
      boxSizing: "border-box",
      padding: 5,
      "&:hover": {
        background: "var(--color-button-hover)",
        transition: "0.5s",
        color: "#FFFF",
      },
    },
    action: {
      flex: "1 1 20%",
      width: "20%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flex: "0",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        borderTop: "1px solid #ebebeb",
      },
    },
    actionWithoutOptionBtn: {
      flex: "1 1 20%",
      width: "20%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "flex-end",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        borderTop: "1px solid #ebebeb",
        flex: "0",
        display: "flex",
        width: "100%",
      },
    },
  })
);

export const dialogTitleStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "#FFF",
      "&:hover": {
        background: "#FFF",
        color: "var(--color-primary)",
        transition: "0.5s",
      },
    },
    dialogTitle: {
      textAlign: "center",
      color: "#FFF",
    },
  })
);

export const dialogOptionStyles = makeStyles((theme: Theme) =>
  createStyles({
    openBtn: {
      border: "1px solid var(--color-primary)",
      color: "var(--color-primary)",
      padding: 5,
      "&:hover": {
        background: "var(--color-button-hover)",
        transition: "0.5s",
        color: "#FFFF",
      },
      [theme.breakpoints.down("md")]: {
        padding: 10,
      },
      [theme.breakpoints.down("xs")]: {
        padding: 5,
        fontSize: 18,
      },
    },
    dialogImg: {
      width: "100%",
    },
    avatar: {
      border: "1px solid var(--color-primary)",
      width: 40,
      height: 40,
    },
    restaurant: {
      padding: "10px 0",
    },
    addBtn: {
      backgroundColor: "var(--color-primary)",
      maxWidth: "50%",
      color: "#FFF",
      padding: "8px 16px",
      "&:hover": {
        backgroundColor: "var(--color-button-hover)",
        transition: "0.5s",
      },
    },
    quantity: {
      width: 40,
      padding: 6,
      borderRadius: 5,
      border: "1px solid",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        width: 30,
      },
    },
    increaseBtn: {
      border: "1px solid var(--color-primary)",
      padding: 10,
      "&:hover": {
        backgroundColor: "var(--color-button-hover)",
        transition: "0.5s",
      },
      [theme.breakpoints.down("xs")]: {
        padding: 7,
      },
    },
    increaseIcon: {
      color: "var(--color-primary)",
      fontSize: 15,
      boxSizing: "border-box",
      "&:hover": {
        color: "#FFF",
        transition: "0.5s",
      },
    },
    decreaseIcon: {
      color: "#FFF",
      fontSize: 15,
      "&:hover": {
        color: "var(--color-button-hover)",
        transition: "0.5s",
      },
    },
    decreaseBtn: {
      padding: 10,
      backgroundColor: "#c0c0c0",
      "&:hover": {
        transition: "0.5s",
      },
      [theme.breakpoints.down("xs")]: {
        padding: 7,
      },
    },
    boxQuantity: {
      width: "25%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export const NameOfFood = styled(withTheme(Typography))((props) => ({
  fontWeight: "bold",
  fontSize: 20,
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineHeight: 1.5,
  width: "100%",
  [props.theme.breakpoints.down("xs")]: {
    lineHeight: 1,
  },
}));

export const Price = styled(withTheme(Typography))((props) => ({
  fontWeight: "bolder",
  fontSize: 16,
  lineHeight: 1.5,
  marginBottom: 4,
  [props.theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

export const RestaurantName = styled(withTheme(Typography))((props) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 15,
  color: "#000",
  textDecoration: "none",
  width: "95%",
}));

export const FoodDetail = styled(withTheme(Typography))((props) => ({
  fontWeight: "lighter",
  fontSize: 15,
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  lineHeight: 2,
  [props.theme.breakpoints.down("xs")]: {
    lineHeight: 2,
  },
}));

export const CustomCardHeader = styled(withTheme(CardHeader))((props) => ({
  width: "100%",
  lineHeight: 1,
  "&& .MuiCardHeader-content": {
    width: "80%",
  },
}));

export const DialogContent = styled(withTheme(MuiDialogContent))((props) => ({
  root: {
    padding: props.theme.spacing(2),
  },
}));

export const DialogActions = styled(withTheme(MuiDialogActions))((props) => ({
  margin: 0,
  padding: props.theme.spacing(1),
  justifyContent: "space-around",
}));

export const TypographyBold = styled(Typography)({
  fontWeight: 500,
  fontSize: 18,
});

export const CustomMuiDialogTitle = styled(MuiDialogTitle)({
  backgroundColor: "var(--color-primary)",
});

export const CustomDialog = styled(Dialog)({
  "& .MuiDialog-paperWidthSm": {
    maxWidth: 450,
    minHeight: "80vh",
  },
});

export const CustomDivider = styled(Divider)({
  width: "100%",
  margin: "10px 0",
});

export const CustomListItem = styled(ListItem)({
  padding: 0,
});

export const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
});

export const ListItemOptionName = styled(ListItemText)({
  "&& .MuiTypography-displayBlock": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "90%",
  },
});

export const ListItemPrice = styled(ListItemText)({
  color: "var(--color-primary)",
  "&& .MuiTypography-displayBlock": {
    fontWeight: 500,
    textAlign: "right",
  },
});

export const ListItemOptionTitle = styled(ListItemText)({
  "&& .MuiTypography-displayBlock": {
    fontWeight: 500,
  },
});

export const CustomCheckBox = withStyles({
  root: {
    "&$checked": {
      color: "var(--color-primary)",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const CustomRadio = withStyles({
  root: {
    "&$checked": {
      color: "var(--color-primary)",
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export const CustomFormControl = styled(FormControl)({
  width: "100%",
});

export const Quantity = styled(Typography)({
  display: "inline",
  fontSize: 16,
  textAlign: "center",
});
