import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Avatar,
  IconButton,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  RadioGroup,
} from "@material-ui/core";
import {
  MoreHoriz,
  Add,
  Remove,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import currency from "currency.js";

import { addToCart } from "store/slices";
import { IProduct } from "models/types";
import { useTranslations } from "hooks";

import DialogTitle from "./DialogTitle";

import {
  DialogContent,
  DialogActions,
  dialogOptionStyles,
  CustomDialog,
  FoodDetail,
  CustomDivider,
  TypographyBold,
  CustomCardHeader,
  RestaurantName,
  CustomCheckBox,
  CustomFormControl,
  CustomListItem,
  CustomListItemIcon,
  CustomRadio,
  ListItemOptionTitle,
  ListItemPrice,
  Quantity,
} from "./styles";

interface IProps {
  product: IProduct;
}
interface IListItem {
  [key: string]: boolean;
}

interface IRadioState {
  [key: string]: number;
}

interface IOptionState {
  [key: string]: boolean;
}

interface ICheckboxState {
  [key: string]: IOptionState[];
}

const DialogOption: FC<IProps> = ({ product }: IProps) => {
  const classes = dialogOptionStyles();
  const { i18n } = useTranslations();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openListItem, setOpenListItem] = useState<IListItem>();
  const [radioState, setRadioState] = useState<IRadioState>();
  const [checkboxState, setCheckboxState] = useState<ICheckboxState>();
  const [quantity, setQuantity] = useState<number>(1);

  //Set list item state for the first time
  useEffect(() => {
    product.options.forEach((option, index) => {
      setOpenListItem((preState) => ({
        ...preState,
        [index]: true,
      }));
    });
  }, []);

  //Set radio state and checkbox state for the first time
  useEffect(() => {
    product.options.forEach((option) => {
      if (option.type === "radio") {
        setRadioState((preState) => ({
          ...preState,
          [option.id]: option.list[0].id,
        }));
      }

      if (option.type === "checkbox") {
        const result = option.list.map((item) => {
          return { [item.id]: false };
        });
        setCheckboxState((preState) => ({
          ...preState,
          [option.id]: result,
        }));
      }
    });
  }, [open]);

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number
  ) => {
    const value = parseInt(event.target.value);
    setRadioState((preState) => ({
      ...preState,
      [optionId]: value,
    }));
  };

  const handleCheckboxChange = (
    index: number,
    optionId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const listId = parseInt(e.target.value);
    const checked = e.target.checked;

    const newCheckboxState = [...(checkboxState?.[optionId] as IOptionState[])];
    newCheckboxState[index][listId] = checked;

    setCheckboxState((preState) => ({
      ...preState,
      [optionId]: newCheckboxState,
    }));
  };

  const handleListItemChange = (index: number) => {
    setOpenListItem((preState) => ({
      ...preState,
      [index]: !openListItem?.[index],
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    var optionState = [];
    //RadioState
    for (let optionId in radioState) {
      const option = getListById(radioState[optionId], parseInt(optionId));
      optionState.push(option);
    }
    // CheckboxState
    for (let optionId in checkboxState) {
      const checkedOption = checkboxState[optionId].filter(
        (item: IOptionState) => {
          return Object.values(item).every((v) => v === true);
        }
      );
      checkedOption.forEach((o: IOptionState) => {
        for (let listId in o) {
          const option = getListById(parseInt(listId), parseInt(optionId));
          optionState.push(option);
        }
      });
    }

    //Add To Cart
    const { id, name, avatar, detail, price, store } = product;
    const action = addToCart({
      storeId: store.id,
      storeName: store.name,
      storeAvatar: store.avatar,
      products: {
        id,
        name,
        avatar,
        price,
        detail,
        quantity,
        cartOptions: optionState,
      },
    });
    dispatch(action);

    setOpen(false);
  };

  const getListById = (listId: number, optionId: number) => {
    var newList;
    const newOption = product.options.filter(
      (option) => option.id === optionId
    );

    for (let list of newOption[0].list) {
      if (list.id === listId) {
        newList = list;
      }
    }
    return newList;
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        className={classes.openBtn}
      >
        <MoreHoriz />
      </IconButton>

      <CustomDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {i18n.t("home_page.menu_items")}
        </DialogTitle>

        <DialogContent dividers>
          <img
            className={classes.dialogImg}
            src={product.avatar}
            alt={product.name}
          />
          <TypographyBold noWrap>{product.name}</TypographyBold>
          <TypographyBold>{currency(product.price).format()}</TypographyBold>
          <FoodDetail noWrap>{product.detail}</FoodDetail>
          <CustomDivider />
          <TypographyBold> {i18n.t("home_page.store")}</TypographyBold>
          <CustomCardHeader
            className={classes.restaurant}
            avatar={
              <Avatar
                alt={product.store.name}
                src={product.store.avatar}
                className={classes.avatar}
              ></Avatar>
            }
            title={<RestaurantName noWrap>{product.store.name}</RestaurantName>}
          />
          {product.options.map((option, index) => (
            <div key={index}>
              <CustomListItem
                button
                onClick={() => handleListItemChange(index)}
              >
                <ListItemOptionTitle primary={option.label} />
                {openListItem?.[index] ? <ExpandLess /> : <ExpandMore />}
              </CustomListItem>

              <Collapse in={openListItem?.[index]} timeout="auto" unmountOnExit>
                <List>
                  <CustomFormControl>
                    {option.type === "radio" && (
                      <RadioGroup
                        name={option.label}
                        value={radioState?.[option.id]}
                        onChange={(event) => {
                          handleRadioChange(event, option.id);
                        }}
                      >
                        {option.list.map((list) => (
                          <ListItem key={list.id}>
                            <CustomListItemIcon>
                              <FormControlLabel
                                value={list.id}
                                control={<CustomRadio />}
                                label={list.name}
                              ></FormControlLabel>
                            </CustomListItemIcon>

                            <ListItemSecondaryAction>
                              <ListItemPrice
                                primary={`${currency(list.price).format()}`}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </RadioGroup>
                    )}

                    {option.type === "checkbox" && (
                      <>
                        {option.list.map((list, index) => (
                          <ListItem key={list.id}>
                            <CustomListItemIcon>
                              <FormControlLabel
                                value={list.id}
                                control={
                                  <CustomCheckBox
                                    onChange={(event) =>
                                      handleCheckboxChange(
                                        index,
                                        option.id,
                                        event
                                      )
                                    }
                                    name={list.name}
                                    value={list.id}
                                  />
                                }
                                label={list.name}
                              ></FormControlLabel>
                            </CustomListItemIcon>

                            <ListItemSecondaryAction>
                              <ListItemPrice
                                primary={`${currency(list.price).format()}`}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </>
                    )}
                  </CustomFormControl>
                </List>
              </Collapse>
              <CustomDivider />
            </div>
          ))}
        </DialogContent>

        <DialogActions>
          <Box className={classes.boxQuantity}>
            <IconButton
              className={classes.decreaseBtn}
              onClick={handleMinusQuantity}
            >
              <Remove className={classes.decreaseIcon} />
            </IconButton>
            <Quantity>{quantity}</Quantity>
            <IconButton
              className={classes.increaseBtn}
              onClick={handlePlusQuantity}
            >
              <Add className={classes.increaseIcon} />
            </IconButton>
          </Box>

          <Button
            autoFocus
            onClick={handleAddToCart}
            className={classes.addBtn}
          >
            {i18n.t("home_page.add_to_cart")}
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};
export default DialogOption;
