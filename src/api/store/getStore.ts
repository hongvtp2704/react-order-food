import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetStore";
import { GetStoreResponseType } from "./responseTypes";

import { getStoreUrl } from "api/endpoints";

interface GetStoreParams extends HookInterface {
  id: string;
}

export const getStore = createAsyncThunk<GetStoreResponseType, GetStoreParams>(
  "store/getStore",
  async (
    { pendingCallback, failureCallback, successCallback, id },
    { rejectWithValue }
  ) => {
    pendingCallback?.();

    try {
      const response: AxiosResponse<GetStoreResponseType> =
        await axios.request<GetStoreResponseType>({
          url: getStoreUrl(id),
          method: "GET",
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
