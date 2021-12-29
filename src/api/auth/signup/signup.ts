import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useSignup";
import { SignupRequestType } from "./requestTypes";
import { SignUpResponseType } from "./responseTypes";

import { signupUrl } from "api/endpoints";

interface SignupParams extends HookInterface {
  data: SignupRequestType;
}

export const signup = createAsyncThunk<SignUpResponseType, SignupParams>(
  "auth/signup",
  async (
    { pendingCallback, failureCallback, successCallback, data },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<SignUpResponseType> =
        await axios.request<SignUpResponseType>({
          url: signupUrl,
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
      return rejectWithValue(err.response);
    }
  }
);
