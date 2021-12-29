import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Card, Typography } from "@material-ui/core";
import { Add, DeleteOutline, Remove } from "@material-ui/icons";

import { removeFormCart, minusQuantity, plusQuantity } from "store/slices";
import { ICartItem } from "models/types";
import { getVndPrice } from "utils";

import {
  ActionBox,
  CustomCardHeader,
  CustomCartContent,
  CustomIconButton,
  FoodName,
  Quantity,
  RestaurantName,
  useStyles,
  OptionName,
} from "./styles";

interface IProps {
  cartItem: ICartItem;
  isCartDrawer: boolean;
}

const BoxCartItem: FC<IProps> = ({ cartItem, isCartDrawer }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { storeId, storeName, storeAvatar, products } = cartItem;
  const [priceState, setPriceState] = useState<Array<number>>([]);

  useEffect(() => {
    products.forEach((product) => {
      var optionPrice = 0;
      if (product.cartOptions) {
        product.cartOptions.forEach((option) => {
          optionPrice += option.price;
        });
      }
      setPriceState((preState) => ({
        ...preState,
        [product.id]: product.price + optionPrice,
      }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlusQuantity = (productId: number) => {
    const action = plusQuantity({
      storeId,
      productId,
      quantity: 1,
    });
    dispatch(action);
  };

  const handleMinusQuantity = (productId: number) => {
    const action = minusQuantity({
      storeId,
      productId,
      quantity: 1,
    });
    dispatch(action);
  };

  const handleRemoveFormCart = (productId: number) => {
    const action = removeFormCart({ storeId, productId });
    dispatch(action);
  };

  return (
    <Card
      className={isCartDrawer ? classes.rootWithPx : classes.rootWithFullWidth}
    >
      <CustomCardHeader
        className={classes.restaurantBox}
        avatar={
          <Avatar
            className={classes.avataRestaurant}
            alt={storeName}
            src={storeAvatar}
          />
        }
        title={<RestaurantName noWrap>{storeName}</RestaurantName>}
      />
      {products?.map((product, index) => (
        <CustomCartContent
          display={isCartDrawer ? "block" : "flex"}
          key={index}
        >
          <CustomCardHeader
            className={classes.foodBox}
            avatar={
              <Avatar
                className={classes.imgFood}
                alt={product.name}
                src={product.avatar}
              />
            }
            title={<FoodName noWrap>{product.name}</FoodName>}
            subheader={
              <Typography>
                {getVndPrice(priceState[product.id] * product.quantity)}
              </Typography>
            }
          />
          {product.cartOptions && (
            <OptionName noWrap>
              {product.cartOptions
                ?.map((option) => <>{option.name}</>)
                .reduce((prev, curr) => (
                  <>{[prev, ",  ", curr]}</>
                ))}
            </OptionName>
          )}

          <ActionBox>
            <CustomIconButton onClick={() => handleRemoveFormCart(product.id)}>
              <DeleteOutline className={classes.icon} />
            </CustomIconButton>
            <CustomIconButton onClick={() => handleMinusQuantity(product.id)}>
              <Remove className={classes.icon} />
            </CustomIconButton>
            <Quantity>{product.quantity}</Quantity>
            <CustomIconButton onClick={() => handlePlusQuantity(product.id)}>
              <Add className={classes.icon} />
            </CustomIconButton>
          </ActionBox>
        </CustomCartContent>
      ))}
    </Card>
  );
};

export default BoxCartItem;
