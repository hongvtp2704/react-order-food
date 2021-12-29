import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useDeleteOrder";
import { DeleteOrderResponseType } from "./responseTypes";

import { deleteOrderUrl } from "api/endpoints";

interface DeleteOrderParams extends HookInterface {
  orderId: string;
}

export const deleteOrder = createAsyncThunk<
  DeleteOrderResponseType,
  DeleteOrderParams
>(
  "order/deleteOrder",
  async (
    { successCallback, pendingCallback, failureCallback, orderId },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<DeleteOrderResponseType> =
        await axios.request({
          url: deleteOrderUrl(orderId),
          method: "DELETE",
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
