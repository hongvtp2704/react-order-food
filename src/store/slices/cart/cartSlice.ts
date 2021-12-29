import { createSlice } from "@reduxjs/toolkit";

import { ICartItem } from "models/types";

interface InitialState {
  cartItems: ICartItem[];
}

const initialState: InitialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      var currentProducts = [];
      const { storeId, products } = newItem;

      var storeIndex = state.cartItems.findIndex((x) => x.storeId === storeId);
      if (storeIndex >= 0) {
        const productIndex = state.cartItems[storeIndex].products.findIndex(
          (x) => x.id === products.id
        );

        if (productIndex >= 0) {
          if (
            JSON.stringify(products.cartOptions) ===
            JSON.stringify(
              state.cartItems[storeIndex].products[productIndex].cartOptions
            )
          ) {
            state.cartItems[storeIndex].products[productIndex].quantity +=
              products.quantity;
          } else {
            products.id += Math.random();
            state.cartItems[storeIndex].products.push(products);
          }
        } else {
          state.cartItems[storeIndex].products.push(products);
        }
      } else {
        currentProducts.push(products);
        const item = { ...newItem, products: currentProducts };
        state.cartItems.push(item);
      }
    },
    plusQuantity(state, action) {
      const { storeId, productId, quantity } = action.payload;
      const storeIndex = state.cartItems.findIndex(
        (x) => x.storeId === storeId
      );
      const productIndex = state.cartItems[storeIndex].products.findIndex(
        (x) => x.id === productId
      );

      if (productIndex >= 0) {
        state.cartItems[storeIndex].products[productIndex].quantity += quantity;
      }
    },
    minusQuantity(state, action) {
      const { storeId, productId, quantity } = action.payload;
      const storeIndex = state.cartItems.findIndex(
        (x) => x.storeId === storeId
      );
      const productIndex = state.cartItems[storeIndex].products.findIndex(
        (x) => x.id === productId
      );
      const storeState = state.cartItems[storeIndex];

      if (productIndex >= 0) {
        storeState.products[productIndex].quantity -= quantity;
        if (storeState.products[productIndex].quantity <= 0) {
          if (storeState.products.length > 1) {
            storeState.products = storeState.products.filter(
              (x) => x.id !== productId
            );
          } else {
            state.cartItems = state.cartItems.filter(
              (x) => x.storeId !== storeId
            );
          }
        }
      }
    },
    removeFormCart(state, action) {
      const { storeId, productId } = action.payload;
      const storeIndex = state.cartItems.findIndex(
        (x) => x.storeId === storeId
      );
      const storeState = state.cartItems[storeIndex];
      if (storeState.products.length > 1) {
        storeState.products = storeState.products.filter(
          (x) => x.id !== productId
        );
      } else {
        state.cartItems = state.cartItems.filter((x) => x.storeId !== storeId);
      }
    },
    reset(state) {
      state.cartItems = [];
    }
  },
});
