import { FC, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { useTranslations } from "hooks";
import { useGetOrderByUser } from "api/order";

import { MainPageTemplate } from "components";
import OrderList from "./OrderList";
import OrderItem from "./OrderItem";

import styles from "./styles";

const OrderHistory: FC = () => {
  const { i18n } = useTranslations();
  const classes = styles();

  const {
    isLoading: fetchingOrdersByUser,
    runRequest: getOrdersByUser,
    responseData: ordersByUser,
  } = useGetOrderByUser({});

  useEffect(() => {
    if (sessionStorage.getItem("user_id")) {
      getOrdersByUser(sessionStorage.getItem("user_id") as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainPageTemplate>
      <Typography className={classes.title}>
        {i18n.t("order_history.title")}
      </Typography>
      <OrderList
        isLoading={fetchingOrdersByUser}
        orderList={ordersByUser?.data || []}
        render={(item) => <OrderItem order={item} />}
      />
    </MainPageTemplate>
  );
};

export default OrderHistory;
