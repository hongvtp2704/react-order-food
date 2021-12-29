import { FC, useState } from "react";
import { IconButton } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import { useSelector } from "react-redux";

import Drawer from "./Drawer";
import { RootState } from "store";

import { CustomBadge, useStyle } from "./styles";

const Cart: FC = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <>
      <IconButton className={classes.cartButton} onClick={() => setOpen(true)}>
        {cartItems.length > 0 ? (
          <CustomBadge color="primary" variant="dot">
            <ShoppingBasket className={classes.cartIcon} />
          </CustomBadge>
        ) : (
          <ShoppingBasket className={classes.cartIcon} />
        )}
      </IconButton>
      <Drawer
        open={open}
        onOpen={() => {}}
        onClose={() => setOpen(false)}
      ></Drawer>
    </>
  );
};

export default Cart;
