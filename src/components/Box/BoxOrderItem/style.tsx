import {
  withTheme,
  Typography,
  CardHeader,
  IconButton,
  Box,
  CardContent,
  Select
} from "@material-ui/core";
import {
  styled,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootWithFullWidth: {
      marginTop: 15,
      width: "100%",
    },
    paymentWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    imgFood: {
      width: 70,
      height: 70,
    },
    foodBox: {
      padding: 0,
    },
    icon: {
      color: "var(--color-primary)",
      fontSize: 15,
    },
    button: {
      background: "var(--color-primary)",
      color: "#FFF"
    },
    paymentMethod: {
      marginRight: 10,
      borderBottom: "none"
    },
    right: {
      display: 'flex',
      alignItems: 'center'
    },
    paymentTitle: {
      marginRight: 10,
    },
    checkoutButton: {
      background: "var(--color-primary)",
      color: "#FFF",
      '&:hover': {
        background: "var(--color-button-hover)"
      }
    }
  })
);

export const FoodName = styled(Typography)({
  fontWeight: 500,
  fontSize: 17,
});

export const CustomCardHeader = styled(CardHeader)({
  width: "100%",
  "&& .MuiCardHeader-content": {
    width: "80%",
  },
});

interface CartContentProps {
  display: string;
  theme: Theme;
}

export const CustomCartContent = styled(withTheme(CardContent))(
  ({ ...props }: CartContentProps) => ({
    borderBottom: "1px solid #d8d8d8",
    justifyContent: "space-between",
    alignItems: "center",
    display: props.display,
    "&& .MuiCardHeader-root": {
      [props.theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    [props.theme.breakpoints.down("xs")]: {
      display: "block",
    },
  })
);

export const Quantity = styled(Typography)({
  display: "inline",
  marginLeft: 8,
  fontSize: 16,
});

export const CustomIconButton = styled(IconButton)({
  border: "1px solid var(--color-primary)",
  padding: 5,
  marginLeft: 8,
});

export const ActionBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 5,
});

export const OptionName = styled(Typography)({
  fontSize: 13,
  margin: "5px 0 5px 5px",
});

export const SelecteStyled = styled(Select)({
  borderBottom: "none"
});