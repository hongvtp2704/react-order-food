import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetOrderByUser";
import { GetOrdersByUserResponseType } from "./responseTypes";
import { GetOrdersByUserQueryType } from "./requestTypes";
import { getOrderByUserUrl } from "api/endpoints/order";

interface GetOrdersByUser extends HookInterface {
  id: string;
  q?: GetOrdersByUserQueryType;
}

export const getOrdersByUser = createAsyncThunk<
  GetOrdersByUserResponseType,
  GetOrdersByUser
>(
  "order/getOrderByUser",
  async (
    { failureCallback, pendingCallback, successCallback, id, q },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetOrdersByUserResponseType> =
        await axios.request<GetOrdersByUserResponseType>({
          url: getOrderByUserUrl(id),
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
