import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import { VerifyResponseType } from "../responseTypes";

import { verify } from "../verify";

export interface HookInterface {
  successCallback?: (data: VerifyResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (token: string) => void;
  responseData: null | VerifyResponseType;
};

export const useVerify: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: compoenntSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [responseData, setResponseData] = useState<null | VerifyResponseType>(
    null
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (token: string) => {
      dispatch(
        verify({
          token,
          successCallback: (data) => {
            setResponseData(data);
            setLoading(false);
            compoenntSuccessCallback?.(data);
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
      componentPendingCallback,
      compoenntSuccessCallback,
      componentFailureCallback,
    ]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
