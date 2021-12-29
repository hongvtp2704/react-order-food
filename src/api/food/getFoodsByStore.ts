import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetFoodsByStore";
import { GetFoodsRequestQueryType } from "./requestTypes";
import { GetFoodsResponseType } from "./responseTypes";

import { getFoodsByStoreUrl } from "api/endpoints";

interface GetFoodsByStore extends HookInterface {
  storeId: string;
  q?: GetFoodsRequestQueryType;
}

export const getFoodsByStore = createAsyncThunk<
  GetFoodsResponseType,
  GetFoodsByStore
>(
  "food/getFoodsByStore",
  async (
    { pendingCallback, failureCallback, successCallback, storeId, q },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetFoodsResponseType> =
        await axios.request<GetFoodsResponseType>({
          url: getFoodsByStoreUrl(storeId),
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
      return rejectWithValue(err.response);
    }
  }
);
