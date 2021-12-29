import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { GetUserResponseType } from "./responseTypes";
import { HookInterface } from "./hooks/useGetInfoUser";
import { getUserUrl } from "api/endpoints/user";

interface GetUserParam extends HookInterface {
  id: string;
}

export const getUser = createAsyncThunk<GetUserResponseType, GetUserParam>(
  "user/getUser",
  async (
    { id, failureCallback, pendingCallback, successCallback }: GetUserParam,
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<GetUserResponseType> = await axios.request({
        url: getUserUrl(id),
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
