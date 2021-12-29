import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../request";
import { LoginResponse, LoginResponseError } from "../responseTypes";
import { LoginRequestBody } from "../requestTypes";
import { AppDispatch } from "store";

export interface HookInterface {
  successCallback?: (data: LoginResponse) => void;
  failureCallback?: (err: LoginResponseError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (data: LoginRequestBody) => void;
};

type HookType = (args: HookInterface) => ReturnType;

export const useLogin: HookType = ({
  successCallback: componentSuccessCallback,
  failureCallback: componentFailureCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const runRequest = useCallback(
    (data: LoginRequestBody) => {
      dispatch(
        login({
          data,
          successCallback: (data) => {
            setLoading(false);
            componentSuccessCallback?.(data);
          },
          failureCallback: (err) => {
            setLoading(false);
            componentFailureCallback?.(err);
          },
          pendingCallback: () => {
            setLoading(true);
            componentPendingCallback?.();
          },
        })
      );
    },
    [
      dispatch,
      componentSuccessCallback,
      componentPendingCallback,
      componentFailureCallback,
    ]
  );

  return {
    isLoading,
    runRequest,
  };
};
