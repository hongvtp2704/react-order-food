import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { ChangePasswordRequest } from "../requestTypes";
import { ChangePasswordResponseType } from "../responseTypes";

import { changePassword } from ".././changePassword";

export interface HookInterface {
  successCallback?: (data: ChangePasswordResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (data: ChangePasswordRequest, id: string) => void;
  responseData: ChangePasswordResponseType | null;
};

export const useChangePassword: (args: HookInterface) => ReturnType = ({
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
  failureCallback: componentFailureCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<null | ChangePasswordResponseType>(null);
  const disptach = useDispatch();

  const runRequest = useCallback(
    (data: ChangePasswordRequest, id: string) => {
      disptach(
        changePassword({
          data,
          id,
          successCallback: (data) => {
            setResponseData(data);
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
      disptach,
      componentPendingCallback,
      componentSuccessCallback,
      componentFailureCallback,
    ]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
