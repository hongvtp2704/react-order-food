import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetStores";
import { GetStoresQueryType } from "./requestTypes";
import { GetStoresResponseType } from "./responseTypes";

import { getStoresUrl } from "api/endpoints";

interface GetStoresParams extends HookInterface {
  q?: GetStoresQueryType;
}

export const getStores = createAsyncThunk<
  GetStoresResponseType,
  GetStoresParams
>(
  "store/getStores",
  async (
    { failureCallback, pendingCallback, q, successCallback },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetStoresResponseType> =
        await axios.request<GetStoresResponseType>({
          url: getStoresUrl,
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
