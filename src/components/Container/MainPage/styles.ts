import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
  styled,
} from "@material-ui/core/styles";
import {
  Toolbar,
  MenuItem,
  Divider,
  AppBar,
  withTheme,
  Paper,
  Box,
  TextField,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    searchWrapper: {
      display: "flex",
      alignItems: "center"
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
      marginRight: 16,
    },
    searchIcon: {
      marginRight: 5,
    },
    inputRoot: {
      color: "#000",
      border: "1px solid #f4f4f4",
      borderRadius: 4,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    icons: {
      color: "var(--color-primary)",
    },
  })
);

export const CustomToolbar = styled(withTheme(Toolbar))((props) => ({
  background: "#FFF",
  width: "85%",
  margin: "0 auto",
  [props.theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const Wrapper = styled("div")({
  background: "#f4f4f4",
  minHeight: "100vh",
});

export const CustomMenuIcon = styled(MenuIcon)({
  color: "var(--color-primary)",
});

export const CustomSearchIcon = styled(SearchIcon)({
  color: "var(--color-primary)",
});

export const CustomAccountIcon = styled(AccountCircle)({
  color: "var(--color-primary)",
  marginTop: 2,
});

export const DrawerContentWrapper = styled("div")({
  width: 250,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

interface IDrawerListItemProps {
  active?: boolean;
}

export const DrawerListItem = styled(MenuItem)(
  ({ active }: IDrawerListItemProps) => ({
    color: active ? "var(--color-primary)" : "#000",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    width: "100%",
    padding: "15px 0",
    "&:hover": {
      color: "#FFF",
      background: "var(--color-button-hover)",
    },
  })
);

export const CustomDivider = styled(Divider)({
  width: "100%",
});

export const Content = styled(withTheme(Paper))((props) => ({
  width: "85%",
  margin: "0 auto",
  minHeight: "60vh",
  padding: "25px 16px 0 16px",
  background: "#f4f4f4",
  [props.theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

export const CustomAppbar = styled(AppBar)({
  background: "#FFF",
});

export const CustomFooter = styled(Box)({
  marginTop: "150px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
  paddingBottom: 20,
});

export const CustomFooterStyle = styled(Box)({
  width: "85%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  padding: "25px 16px 0",
});

export const CustomFooter_Element = styled(Box)({
  width: "19%",
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "20px",
});

export const CustomTitle = styled(Box)({
  marginTop: "60px",
});

export const Title_company = styled(Typography)({
  fontSize: "15px",
  color: "#4e88ff",
  marginTop: "5px",
});

export const Title_Portal = styled(Typography)({
  fontSize: "15px",
  marginTop: "5px",
  color: "#BDBDBD",
  marginRight: "10px",
});

export const CustomFacebookIcon = styled(FacebookIcon)({
  marginLeft: "24%",
  marginTop: "5px",
});

export const CustomInstagramIcon = styled(InstagramIcon)({
  marginLeft: "5%",
});

export const CustomTitleStyle = styled(Typography)({
  textAlign: "right",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: 10,
});

export const Title_Portal_Style = styled(Typography)({
  fontSize: "15px",
  color: "#BDBDBD",
  textAlign: "right",
});

export const Logo_Footer = styled(Box)({
  color: "var(--color-primary)",
  fontSize: "24px",
  textAlign: "right",
  width: "50%",
  marginLeft: "12%",
});

export const SearchWrapper = styled("div")({
  width: 150,
});

export const SearchInput = styled(TextField)({
  color: "var(--primary-color)",
  "& .MuiInput-underline:after": {
    display: "none !important",
  },
  "& .MuiInput-underline:before": {
    display: "none !important",
  },
  "& .MuiInput-formControl": {
    marginTop: "0 !important",
  },
});
