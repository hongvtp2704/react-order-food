import React from "react";
import Helmet from "react-helmet";

import { useTranslations } from "hooks";

import BoxOrderStatus from "./BoxOrderStatus";
import { MainPageTemplate } from "components";

interface IProps {};



function Order(props: IProps) {
  const { i18n } = useTranslations();

  return (
    <>
      <Helmet>
        <title>{i18n.t("order_page.title")}</title>
      </Helmet>
      <MainPageTemplate>
        <BoxOrderStatus />
      </MainPageTemplate>
    </>
  );
}

export default Order;
