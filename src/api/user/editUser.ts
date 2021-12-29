import { createAsyncThunk } from "@reduxjs/toolkit";
import { editUserUrl } from "api/endpoints/user";
import axios, { AxiosError, AxiosResponse } from "axios";

import { HookInterface } from "./hooks/useEditUser";
import { EditUserRequestType } from "./requestTypes";
import { EditUserResponseType } from "./responseTypes";

interface EditUserParms extends HookInterface {
  data: EditUserRequestType;
  id: string;
}

export const editUser = createAsyncThunk<EditUserResponseType, EditUserParms>(
  "user/editUser",
  async (
    { failureCallback, successCallback, pendingCallback, data, id },
    { rejectWithValue }
  ) => {
    pendingCallback?.();
    try {
      const response: AxiosResponse<EditUserResponseType> = await axios.request({
        url: editUserUrl(id),
        method: "PUT",
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
