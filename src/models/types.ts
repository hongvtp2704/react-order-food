import React from "react";

export interface IRoute {
  path: string;
  exact: boolean;
  hasLogin?: boolean;
  requireAuth?: boolean;
  Component: React.ComponentType<any>;
}

export interface IFoodOption {
  id: number;
  label: string;
  type: string;
  list: IList[];
}
export interface IList {
  id: number;
  name: string;
  price: number;
}

export interface IProduct {
  id: number;
  name: string;
  avatar: string;
  price: number;
  detail: string;
  store: {
    id: number;
    name: string;
    avatar: string;
  };
  options: IFoodOption[];
}

export interface ICartItem {
  storeId: number;
  storeName: string;
  storeAvatar: string;
  products: {
    id: number;
    name: string;
    avatar: string;
    price: number;
    detail: string;
    quantity: number;
    cartOptions: IList[];
  }[];
}

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: null | string;
  fb_id: null | string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  phone: string;
  address: string;
  name: string;
};

export interface UserInfo {
  id: string;
  fullName: string;
  address: string;
  phoneNumber: string;
}

export interface IContentHome {
  id: number;
  imgUrlContent: string;
  decriptions: string;
  decriptionsDetail: string;
}

export interface IProductDetail {
  id: number;
  name: string;
  address: string;
  imgUrl: string;
  price: string;
  description: string;
  time: string;
}
export interface IStore {
  id: number;
  name: string;
  avatar: string;
  address: string;
}

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Food = {
  id: string;
  name: string;
  avatar: null | string;
  price: number;
  detail: null | string;
  store_id: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  avatar_placeholder: string;
  category: {
    name: string;
  };
  store: {
    name: string;
    avatar: null | string;
  };
};

export enum CommunityContentId {
  PROGRESS = 1,
  INTRO = 2,
  PARTNER = 3,
}

export type Store = {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  email: string;
  avatar: null | string;
  is_verified: boolean;
  open: boolean;
  createdAt: string;
  updatedAt: string;
  avatar_placeholder: string;
  status: boolean;
};

export type OrderItem = {
  food: {
    name: string;
    store: Store;
  };
  food_id: string;
  order_id: string;
  price: number;
  qty: number;
  update_at: string;
};

export type Order = {
  id: string;
  store_id: string;
  driver_id: null | string;
  coupon_id: null | string;
  user_id: string;
  total: number;
  rating: number;
  status: string;
  payment_option: string;
  createdAt: string;
  updatedAt: string;
  shipper_fee: number;
  store: {
    name: string;
  };
  user: {
    name: string;
    address: string;
    phone: string;
  };
  driver: null | string;
  coupon: null | string;
  orders_items: OrderItem[];
};

export enum PaymentStatusIndex {
  PAYMENT = 0,
  FINDING_DRIVER = 1,
  COOKING_FOODS = 2,
  DELIVERING = 3,
  DONE = 4,
}
