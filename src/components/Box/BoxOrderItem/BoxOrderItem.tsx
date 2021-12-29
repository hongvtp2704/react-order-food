import { FC, useMemo, useState, useEffect } from "react";
import { Avatar, Card, Typography, Button } from "@material-ui/core";
import { EventNoteOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { useHistory } from "react-router-dom";

import { RootState } from "store";
import { getVndPrice } from "utils";
import { useGetOrderByUser, useDeleteOrder } from "api/order";
import { PaymentStatusIndex } from "models/types";
import { useCreateOrder } from "api/order";
import { reset } from "store/slices";

import ModalPaymentMethod from "./ModalPaymentMethod";
import { Spinner } from "components";

import {
  ActionBox,
  CustomCardHeader,
  CustomCartContent,
  CustomIconButton,
  FoodName,
  Quantity,
  useStyles,
  OptionName,
} from "./style";

type Props = {
  onPaymentSuccess: (activeStep: PaymentStatusIndex) => void;
};

enum OrderStatus {
  DONE = "done",
  FINDING_DRIVER = "finding_driver",
  WAIT_COOKING = "cooking_foods",
  DELIVEING = "delivering",
}

declare const window: {
  autoSendRequestOrder: ReturnType<typeof setTimeout>;
};

const BoxOrderItem: FC<Props> = ({ onPaymentSuccess }: Props) => {
  const classes = useStyles();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [isVisibileCheckButton, setVisibileCheckouButton] = useState(true);
  const history = useHistory();

  const { isLoading: creatingOrder, runRequest: createOrder } = useCreateOrder({
    successCallback: (data) => {
      localStorage.setItem("newest_order_id", data.id);
      setVisibileCheckouButton(false);
      onPaymentSuccess(PaymentStatusIndex.FINDING_DRIVER);
    },
  });

  const { isLoading: deletingOrder, runRequest: deleteOrder } = useDeleteOrder({
    successCallback: () => {
      localStorage.removeItem("newest_order_id");
      dispatch(reset());
      history.replace("/");
    },
  });

  const { runRequest: fetchOrderByUser } = useGetOrderByUser({
    successCallback: (data) => {
      const newestOrder = data.data.find(
        (item) => item.id === localStorage.getItem("newest_order_id")
      );
      if (localStorage.getItem("newest_order_id")) {
        autoGetOrder();
        updateValueStep(newestOrder?.status || "");
      }
    },
  });

  const autoGetOrder = (): void => {
    if (window.autoSendRequestOrder) {
      clearInterval(window.autoSendRequestOrder);
    }
    window.autoSendRequestOrder = setInterval(() => {
      fetchOrderByUser(sessionStorage.getItem("user_id") as string);
    }, 10000);
  };

  const updateValueStep = (status: string): void => {
    let activeStepIndex: number = 0;
    console.log(status);
    switch (status) {
      case OrderStatus.FINDING_DRIVER:
        activeStepIndex = PaymentStatusIndex.FINDING_DRIVER;
        break;
      case OrderStatus.WAIT_COOKING:
        activeStepIndex = PaymentStatusIndex.COOKING_FOODS;
        break;
      case OrderStatus.DELIVEING:
        activeStepIndex = PaymentStatusIndex.DELIVERING;
        break;
      case OrderStatus.DONE:
        clearInterval(window.autoSendRequestOrder);
        localStorage.removeItem("newest_order_id");
        activeStepIndex = PaymentStatusIndex.DONE;
        dispatch(reset());
        break;
      default:
        activeStepIndex = PaymentStatusIndex.FINDING_DRIVER;
        break;
    }
    onPaymentSuccess(activeStepIndex);
  };

  const totalPrice = useMemo(() => {
    if (!cartItems.length) return 0;
    return cartItems
      .map((item) =>
        item.products.reduce((total, p) => (total += p.price * p.quantity), 0)
      )
      .reduce((total, i) => (total += i), 0);
  }, [cartItems]);

  const onClickPayment = (paymentMethod: string) => {
    setOpenModal(false);
    const mappedObject = {
      store_id: cartItems.map((item) => item.storeId.toString()) as string[],
      total: totalPrice,
      payment_option: "cash",
      address: sessionStorage.getItem("user_address") as string,
      user_id: sessionStorage.getItem("user_id") as string,
      items: getFoodItems(),
    };

    createOrder(mappedObject);
  };

  const getFoodItems = () => {
    let items: {
      food_id: string;
      qty: number;
      price: number;
    }[] = [];

    cartItems.map((item) => {
      return item.products.map((p) => {
        items.push({
          food_id: p.id.toString(),
          qty: p.quantity,
          price: p.price,
        });
        return {
          food_id: p.id,
          qty: p.quantity,
          price: p.price,
        };
      });
    });

    return items;
  };

  useEffect(() => {
    if (localStorage.getItem("newest_order_id")) {
      setVisibileCheckouButton(false);
      fetchOrderByUser(sessionStorage.getItem("user_id") as string);
    }

    return () => {
      clearInterval(window.autoSendRequestOrder);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.rootWithFullWidth}>
      {map(cartItems, (order) => (
        <>
          {map(order.products, (product, index) => (
            <CustomCartContent display="flex" key={index}>
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
                  <OptionName noWrap>
                    {getVndPrice(product.price * product.quantity)}
                  </OptionName>
                }
              />

              <ActionBox>
                <CustomIconButton disabled>
                  <EventNoteOutlined className={classes.icon} />
                </CustomIconButton>
                <Quantity>{product.quantity}</Quantity>
              </ActionBox>
            </CustomCartContent>
          ))}
        </>
      ))}
      {!!(cartItems.length && isVisibileCheckButton) && (
        <>
          <CustomCartContent display="flex">
            <Typography>Total: {getVndPrice(totalPrice)}</Typography>
            <Button
              variant="contained"
              className={classes.checkoutButton}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {creatingOrder ? <Spinner color="#FFF" size={14} /> : "Check out"}
            </Button>
          </CustomCartContent>
          <ModalPaymentMethod
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            onClickPayment={(paymentMethod) => {
              autoGetOrder();
              onClickPayment(paymentMethod);
            }}
          />
        </>
      )}

      {localStorage.getItem("newest_order_id") && (
        <>
          <CustomCartContent display="flex">
            <Button
              variant="contained"
              className={classes.checkoutButton}
              onClick={() => {
                deleteOrder(localStorage.getItem("newest_order_id") as string);
              }}
            >
              {deletingOrder ? <Spinner color="#FFF" size={14} /> : "Cancel"}
            </Button>
          </CustomCartContent>
        </>
      )}
    </Card>
  );
};

export default BoxOrderItem;
