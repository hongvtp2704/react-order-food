import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { SwipeableDrawer, Typography } from "@material-ui/core";

import { RootState } from "store";
import { useTranslations } from "hooks";

import { BoxCartItem } from "components/Box/BoxCartItem";
import CheckoutDialog from "./CheckoutDialog";

import {
  CheckoutButton,
  CloseButtonDrawer,
  CustomChevronRightIcon,
  CustomDivider,
  DrawerContentWrapper,
  DrawerHeader,
  CustomCartIcon,
} from "./styles";

interface IProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Drawer: FC<IProps> = ({ open, onClose, onOpen }: IProps) => {
  const { i18n } = useTranslations();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        <DrawerContentWrapper>
          <DrawerHeader>
            <CustomCartIcon />
            <CloseButtonDrawer onClick={onClose}>
              <CustomChevronRightIcon />
            </CloseButtonDrawer>
          </DrawerHeader>
          <CustomDivider />
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <BoxCartItem key={index} cartItem={item} isCartDrawer={true} />
              ))}
              <CheckoutButton size="large" onClick={() => setOpenDialog(true)}>
                {i18n.t("home_page.check_out")}
              </CheckoutButton>
              <CheckoutDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onOpen={() => {}}
              />
            </>
          ) : (
            <Typography>Cart is empty</Typography>
          )}
        </DrawerContentWrapper>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
