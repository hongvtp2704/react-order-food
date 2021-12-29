import { Category } from "models/types";

export type GetCategoriesResponseType = {
  size: number;
  currentPage: number;
  total: number;
  data: Category[];
};
