import { loginSlice, loginSelector } from "./auth";
import { cartSlice } from "./cart";

const { actions } = cartSlice;

export const { addToCart, minusQuantity, plusQuantity, removeFormCart, reset } =
  actions;
export { loginSlice, loginSelector, cartSlice };
