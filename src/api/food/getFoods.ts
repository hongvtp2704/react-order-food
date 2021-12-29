import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetFoods";
import { GetFoodsRequestQueryType } from "./requestTypes";
import { GetFoodsResponseType } from "./responseTypes";

import { getFoodsUrl } from "api/endpoints";

interface GetFoodsParams extends HookInterface {
  q?: GetFoodsRequestQueryType;
}

export const getFoods = createAsyncThunk<GetFoodsResponseType, GetFoodsParams>(
  "food/getFood",
  async (
    { failureCallback, pendingCallback, successCallback, q },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetFoodsResponseType> =
        await axios.request<GetFoodsResponseType>({
          url: getFoodsUrl,
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
