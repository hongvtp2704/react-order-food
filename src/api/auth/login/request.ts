import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginRequestBody } from "./requestTypes";
import { HookInterface } from "./hook";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginResponse, LoginResponseError } from "./responseTypes";
import { loginUrl } from "api/endpoints";

interface LoginRequestParams extends HookInterface {
  data: LoginRequestBody;
}

export const login = createAsyncThunk<LoginResponse, LoginRequestParams, {}>(
  "auth/login",
  async ({
    data,
    failureCallback,
    pendingCallback,
    successCallback,
  }: LoginRequestParams, { rejectWithValue }) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<LoginResponse> = await axios.request({
        url: loginUrl,
        method: "POST",
        data,
      });

      successCallback?.(response.data);
      return response.data;
    } catch (e) {
        const err = e as AxiosError<LoginResponseError>;
        if (!err.response) {
            throw e;
        }
        failureCallback?.(err.response);
        return rejectWithValue(err);
    }
  }
);
