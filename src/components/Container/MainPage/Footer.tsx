/* eslint-disable react/jsx-pascal-case */
import { FC } from "react";

import { useTranslations } from "hooks";

import { Logo } from "components";

import {
  CustomFooter,
  CustomFooter_Element,
  CustomTitleStyle,
  Title_Portal,
  Title_Portal_Style,
  CustomFooterStyle,
} from "./styles";


const Footer: FC = () => {
  const { i18n } = useTranslations();
  return (
    <div>
      <CustomFooter>
        <CustomFooterStyle>
          <CustomFooter_Element>
            <Logo />
            <Title_Portal>{i18n.t("footer.title_portal")}</Title_Portal>
          </CustomFooter_Element>

          <CustomFooter_Element>
            <CustomTitleStyle>
              {i18n.t("footer.title_address")}
            </CustomTitleStyle>
            <Title_Portal_Style>
              {i18n.t("footer.title_address_detail_2")}
            </Title_Portal_Style>
          </CustomFooter_Element>
        </CustomFooterStyle>
      </CustomFooter>
    </div>
  );
};

export default Footer;
