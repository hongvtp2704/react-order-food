import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFoodByCategoryUrl } from "api/endpoints";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetFoodByCategory";
import { GetFoodsRequestQueryType } from "./requestTypes";
import { GetFoodsResponseType } from "./responseTypes";

interface GetFoodsByCategory extends HookInterface {
  q?: GetFoodsRequestQueryType;
  cateId: string;
}

export const getFoodByCategory = createAsyncThunk<
  GetFoodsResponseType,
  GetFoodsByCategory
>(
  "food/getFoodsByCategory",
  async (
    { pendingCallback, failureCallback, successCallback, q, cateId },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetFoodsResponseType> =
        await axios.request<GetFoodsResponseType>({
          url: getFoodByCategoryUrl(cateId),
          method: "GET",
          params: {
            q,
          },
        });

      successCallback?.(response.data);
      return response.data;
    } catch (e) {
      const err = e as AxiosError;

      if (!err.response) {
        throw e;
      }

      failureCallback?.(err);
      return rejectWithValue(err);
    }
  }
);
