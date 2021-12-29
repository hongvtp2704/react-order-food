import { FC } from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { useTranslations } from "hooks";

import { Logo } from "components";
import { DrawerContentWrapper, DrawerListItem, CustomDivider } from "./styles";

interface IProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}
const Drawer: FC<IProps> = ({ open, onClose, onOpen }: IProps) => {
  const { i18n } = useTranslations();
  return (
    <div>
      <>
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={onClose}
          onOpen={onOpen}
        >
          <DrawerContentWrapper>
            <Logo margin="16px 0 23px 0" />
            <CustomDivider />
            <DrawerListItem onClick={() => {}} active={true}>
              {i18n.t("main_page_template.menu.home")}
            </DrawerListItem>
            <DrawerListItem onClick={() => {}}>
              {i18n.t("main_page_template.menu.profile")}
            </DrawerListItem>
            <DrawerListItem onClick={() => {}}>
              {i18n.t("main_page_template.menu.contact")}
            </DrawerListItem>
          </DrawerContentWrapper>
        </SwipeableDrawer>
      </>
    </div>
  );
};

export default Drawer;
