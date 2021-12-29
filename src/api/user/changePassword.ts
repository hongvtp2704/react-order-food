import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useChangePassword";
import { ChangePasswordRequest } from "./requestTypes";
import { ChangePasswordResponseType } from "./responseTypes";
import { changePasswordUrl } from "api/endpoints";

interface ChangePasswordParams extends HookInterface {
  data: ChangePasswordRequest;
  id: string;
}

export const changePassword = createAsyncThunk<ChangePasswordResponseType, ChangePasswordParams>(
  "user/changePassword",
  async (
    { successCallback, pendingCallback, failureCallback, data, id },
    { rejectWithValue }
  ) => {
      pendingCallback?.();
      try {
        const response: AxiosResponse<ChangePasswordResponseType> = await axios.request({
            url: changePasswordUrl(id),
            method: "PUT",
            data
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
