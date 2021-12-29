import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useVerify";
import { VerifyResponseType } from "./responseTypes";

import { verifyUrl } from "api/endpoints";

interface VerifyUserParams extends HookInterface {
  token: string;
}

export const verify = createAsyncThunk<VerifyResponseType, VerifyUserParams>(
  "auth/verify",
  async (
    { token, failureCallback, pendingCallback, successCallback },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<VerifyResponseType> =
        await axios.request<VerifyResponseType>({
          url: verifyUrl(token),
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
      return rejectWithValue(err);
    }
  }
);
