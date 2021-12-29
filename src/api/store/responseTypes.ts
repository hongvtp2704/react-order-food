import { Store } from "models/types";

export type GetStoresResponseType = {
  size: number;
  currentPage: number;
  total: number;
  data: Store[];
};

export type GetStoreResponseType = {
  status: number;
  data: Store;
};
