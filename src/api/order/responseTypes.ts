import { Order } from "models/types";

export type CreateOrderResponseType = {
  rating: number;
  status: string;
  store_id: string[];
  user_id: string;
  total: number;
  payment_option: string;
  address: string;
  id: string;
  updatedAt: string;
  createdAt: string;
  driver_id: null;
  coupon_id: null;
  items: {
    order_id: string;
    food_id: string;
    qty: number;
    price: number;
    updatedAt: string;
    createdAt: string;
  }[];
};

export type GetOrdersByUserResponseType = {
  size: number;
  currentPage: number;
  total: number;
  data: Order[];
};

export type DeleteOrderResponseType = {
  status: number;
  data: Order;
}