import {
  Badge,
  Button,
  createStyles,
  Dialog,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  makeStyles,
  styled,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { ShoppingBasket, ChevronRight } from "@material-ui/icons";

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    cartButton: {
      background: "var(--color-primary)",
      position: "fixed",
      bottom: "5%",
      right: "3%",
      zIndex: 1000,
      "&:hover": {
        background: "var(--color-button-hover)",
        transition: "0.5s",
      },
    },
    cartIcon: {
      color: "#FFF",
    },
  })
);

export const CustomCartIcon = styled(ShoppingBasket)({
  color: "var(--color-primary)",
  fontSize: 50,
  margin: "16px 0 23px 0",
});

export const CustomBadge = styled(Badge)({
  "&& .MuiBadge-colorPrimary": {
    backgroundColor: "#FFF",
  },
});

export const CustomDivider = styled(Divider)({
  width: "100%",
});

export const DrawerContentWrapper = styled("div")((props) => ({
  width: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [props.theme.breakpoints.down("xs")]: {
    width: "100vw",
  },
}));

export const CheckoutButton = styled(Button)({
  backgroundColor: "var(--color-primary)",
  color: "#fff",
  marginTop: 25,
  width: "95%",
  "&:hover": {
    backgroundColor: "var(--color-button-hover)",
    transition: "0.5s",
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const CloseButtonDrawer = styled(IconButton)({
  position: "absolute",
  right: 5,
  "&:hover": {
    backgroundColor: "var(--color-button-hover)",
    transition: "0.5s",
  },
});

export const CustomChevronRightIcon = styled(ChevronRight)({
  "&:hover": {
    color: "#FFF",
    transition: "0.5s",
  },
});

export const CustomDialogTitle = styled(DialogTitle)({
  background: "var(--color-primary)",
  color: "#FFF",
});

export const CustomDialogContentText = styled(DialogContentText)({
  margin: "5px 0 5px 0",
  color: "#000000",
  fontWeight: 400,
});

export const CustomDialog = styled(Dialog)({
  "& .MuiDialog-paperWidthSm": {
    width: 600,
  },
});

export const DialogButton = styled(Button)({
  background: "var(--color-primary)",
  color: "#FFF",
  "&:hover": {
    background: "var(--color-button-hover)",
    transition: "0.5s",
  },
});

export const InputField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottom: "2px solid #000000",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#000000",
  },
});

export const ErrorText = styled(Typography)({
  fontSize: 12,
});
