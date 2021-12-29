import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store";
import { axiosSetAuthToken } from "utils";
import { login } from "api/auth";
import { LoginResponse } from "api/auth/login/responseTypes";

interface InitialState {
  token: string;
  userId: string;
}

const initialState: InitialState = {
  token: "",
  userId: "",
};

export const loginSlice = createSlice({
  initialState,
  name: "auth/login",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, () => {});
    builder.addCase(login.rejected, () => {});
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      if (action.payload) {
        state.token = action.payload.data.accessToken;
        state.userId = action.payload.data.id;
        axiosSetAuthToken(action.payload.data.accessToken);
      }
    });
  },
});

export const loginSelector = (rootState: RootState) => rootState.login;
