export type CreateOrderRequestType = {
  store_id: string[];
  user_id: string;
  total: number;
  payment_option: string;
  address: string;
  items: {
    food_id: string;
    qty: number;
    price: number;
  }[];
};

export type GetOrdersByUserQueryType = {
  limit?: number;
  page?: number;
}