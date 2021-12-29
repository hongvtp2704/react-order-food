import { Food } from "models/types";

export type GetFoodsResponseType = {
  size: number;
  currentPage: number;
  total: number;
  data: Food[];
};
