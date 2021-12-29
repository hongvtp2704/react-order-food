import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useGetCategories";
import { GetCategoriesResponseType } from "./responseTypes";
import { GetCategoriesRequestType } from "./requestTypes";

import { getAllCategories } from "api/endpoints";

interface GetCategoriesParams extends HookInterface {
  q?: GetCategoriesRequestType;
}

export const getCategories = createAsyncThunk<
  GetCategoriesResponseType,
  GetCategoriesParams
>(
  "category/getCategories",
  async (
    { failureCallback, successCallback, pendingCallback, q },
    { rejectWithValue }
  ) => {
    pendingCallback?.();

    try {
      const response: AxiosResponse<GetCategoriesResponseType> =
        await axios.request<GetCategoriesResponseType>({
          url: getAllCategories,
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
