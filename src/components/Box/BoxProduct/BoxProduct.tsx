import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Avatar,
} from "@material-ui/core";

import { useTranslations } from "hooks";
import { addToCart } from "store/slices";
import { Food } from "models/types";
import { getVndPrice } from "utils";

import {
  useStyles,
  NameOfFood,
  Price,
  CustomCardHeader,
  FoodDetail,
  RestaurantName,
} from "./styles";

interface IProps {
  product: Food;
  hideButton?: boolean;
}

const BoxProduct: FC<IProps> = ({ product, hideButton }: IProps) => {
  const classes = useStyles();
  const {
    id,
    avatar,
    name,
    detail,
    price,
    store,
    store_id,
    avatar_placeholder,
  } = product;

  const { i18n } = useTranslations();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const action = addToCart({
      storeId: store_id,
      storeName: store.name,
      storeAvatar: store.avatar,
      products: {
        id,
        name,
        avatar,
        price,
        detail,
        quantity: 1,
      },
    });
    dispatch(action);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={avatar || avatar_placeholder}
        title={name}
      />

      <Box className={classes.detail}>
        <NameOfFood noWrap>{name}</NameOfFood>
        <FoodDetail noWrap>{detail}</FoodDetail>
        <Price noWrap>{getVndPrice(price)}</Price>
        <CustomCardHeader
          avatar={
            <Avatar
              alt={store.name}
              src={store.avatar || ""}
              className={classes.avatar}
            ></Avatar>
          }
          title={
            <Link to={`/store/${store_id}`}>
              <RestaurantName noWrap>{store.name}</RestaurantName>
            </Link>
          }
        />
      </Box>
      {hideButton ? (
        <></>
      ) : (
        <>
          <CardActions className={classes.actionWithoutOptionBtn}>
            <Button
              size="small"
              className={classes.addBtn}
              onClick={handleAddToCart}
            >
              {i18n.t("home_page.button_add")}
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default BoxProduct;
