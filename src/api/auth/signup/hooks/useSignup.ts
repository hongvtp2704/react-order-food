import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import { SignUpResponseType } from "../responseTypes";
import { SignupRequestType } from "../requestTypes";

import { signup } from "../signup";

export interface HookInterface {
  successCallback?: (data: SignUpResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (data: SignupRequestType) => void;
  responseData: null | SignUpResponseType;
};

export const useSignup: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: compoenntSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | SignUpResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (data: SignupRequestType) => {
      dispatch(
        signup({
          data,
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
    responseData,
    runRequest,
    isLoading,
  };
};
