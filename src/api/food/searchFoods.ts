import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useSearchFoods";
import { SearchFoodsRequestQueryType } from "./requestTypes";
import { GetFoodsResponseType } from "./responseTypes";

import { searchFoodsUrl } from "api/endpoints";

interface SearchFoodSParams extends HookInterface {
  q?: SearchFoodsRequestQueryType;
}

export const searchFoods = createAsyncThunk<
  GetFoodsResponseType,
  SearchFoodSParams
>(
  "food/searchFoods",
  async (
    { failureCallback, pendingCallback, q, successCallback },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetFoodsResponseType> = await axios.request(
        {
          url: searchFoodsUrl,
          method: "GET",
          params: q,
        }
      );

      successCallback?.(response.data);
      return response.data;
    } catch (e) {
      const err = e as AxiosError;

      if (!err.response) {
        throw e;
      }

      failureCallback?.(err);
      return rejectWithValue(err.response);
    }
  }
);
