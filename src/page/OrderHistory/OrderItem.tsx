import { FC } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { AccessTime, ArrowForwardIos } from "@material-ui/icons";
import dayjs from "dayjs";

import { getVndPrice } from "utils";
import { Order } from "models/types";

import styles from "./styles";

type Props = {
  order: Order;
}

const OrderItem: FC<Props> = ({ order }: Props) => {
  const classes = styles();

  return (
    <Card className={classes.orderWrapper}>
      <CardContent className={classes.contentWrapper}>
        <div>
          <Typography className={classes.orderDate}>
            <AccessTime className={classes.dateIcon} /> <span>{dayjs(order.createdAt).format("DD, YYYY")}</span>
          </Typography>
          <Typography className={classes.nameStore}>
            {order?.orders_items[0]?.food.store.name || ""}
          </Typography>
          <Typography className={classes.price}>
            {getVndPrice(order.total + order.shipper_fee)} ({order.payment_option}) | {order.orders_items.length} món
          </Typography>
        </div>
        <ArrowForwardIos className={classes.arrowRightIcon} />
      </CardContent>
    </Card>
  );
};

export default OrderItem;
