import { FC, ReactElement } from "react";
import { map } from "lodash";

import { Order } from "models/types";

import { Spinner } from "components";

type Props = {
  isLoading: boolean;
  render: (item: Order) => ReactElement;
  orderList: Order[];
};

const OrderList: FC<Props> = ({ isLoading, orderList, render }: Props) => {
  return (
    <>
      {isLoading ? (
        <Spinner center />
      ) : (
        <>{map(orderList, (item) => render(item))}</>
      )}
    </>
  );
};

export default OrderList;
