import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateOrderResponseType } from "./responseTypes";
import { HookInterface } from "./hooks/useCreateOrder";
import { CreateOrderRequestType } from "./requestTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createOrderUrl } from "api/endpoints/order";

interface CreateOrderParams extends HookInterface {
  data: CreateOrderRequestType;
}

export const createOrder = createAsyncThunk<
  CreateOrderResponseType,
  CreateOrderParams
>(
  "order/createOrder",
  async (
    { pendingCallback, failureCallback, successCallback, data },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<CreateOrderResponseType> =
        await axios.request<CreateOrderResponseType>({
          url: createOrderUrl,
          method: "POST",
          data,
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
