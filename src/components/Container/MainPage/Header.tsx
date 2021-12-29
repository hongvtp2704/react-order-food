import { FC, useState, useEffect } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { map, find } from "lodash";
import {
  EditOutlined,
  HistoryOutlined,
  EventNoteOutlined,
  ExitToAppOutlined,
  VpnKeyOutlined,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useTranslations, useDebounce } from "hooks";
import { useSearchFoods } from "api/food";

import { Logo } from "components";
import {
  useStyles,
  CustomToolbar,
  CustomAccountIcon,
  CustomAppbar,
  CustomSearchIcon,
  SearchWrapper,
  SearchInput,
} from "./styles";

const Header: FC = () => {
  const classes = useStyles();
  const { i18n } = useTranslations();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const searchQueryString = useDebounce({
    delay: 300,
    value: searchValue
  });
  const { runRequest: searchFoods, responseData: foods } = useSearchFoods({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    searchFoods({ search: searchQueryString });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQueryString]);

  const onSelectFood = (foodName: string) => {
    const foundFood = find(foods?.data, (item) => item.name === foodName);

    if (foundFood) {
      history.replace(`/store/${foundFood.store_id}`);
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <CustomAppbar position="sticky">
        <CustomToolbar>
          <div className={classes.logo} onClick={() => history.push("/")}>
            <Logo margin="4px 0 0 0" />
          </div>
          <div className={classes.search}>
            <SearchWrapper>
              <Autocomplete
                options={searchValue ? map(foods?.data, item => item.name) : []}
                freeSolo
                fullWidth
                disableClearable
                renderInput={(params: unknown) => (
                  <div className={classes.searchWrapper}>
                    <CustomSearchIcon className={classes.searchIcon} />
                    <SearchInput
                      {...params}
                      placeholder="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                )}
                onChange={(e, value) => {
                  onSelectFood(value);
                }}
              />
            </SearchWrapper>
          </div>

          <IconButton onClick={handleClick}>
            <CustomAccountIcon />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              <ListItem button onClick={() => history.push("/order")}>
                <ListItemIcon>
                  <EventNoteOutlined className={classes.icons} />
                </ListItemIcon>
                <ListItemText
                  primary={i18n.t("main_page_template.current_order")}
                />
              </ListItem>

              <ListItem button onClick={() => history.push("/history")}>
                <ListItemIcon>
                  <HistoryOutlined className={classes.icons} />
                </ListItemIcon>
                <div onClick={() => history.push("/order-history")}>
                  <ListItemText
                    primary={i18n.t("main_page_template.order_history")}
                  />
                </div>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  history.push("/edit-profile");
                }}
              >
                <ListItemIcon>
                  <EditOutlined className={classes.icons} />
                </ListItemIcon>
                <ListItemText
                  primary={i18n.t("main_page_template.edit_profile")}
                />
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  history.push("/change-pass");
                }}
              >
                <ListItemIcon>
                  <VpnKeyOutlined className={classes.icons} />
                </ListItemIcon>
                <ListItemText
                  primary={i18n.t("main_page_template.change_password")}
                />
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  sessionStorage.clear();
                  history.push("/login");
                }}
              >
                <ListItemIcon>
                  <ExitToAppOutlined className={classes.icons} />
                </ListItemIcon>
                <ListItemText primary={i18n.t("main_page_template.logout")} />
              </ListItem>
            </List>
          </Popover>
        </CustomToolbar>
      </CustomAppbar>
    </div>
  );
};

export default Header;
