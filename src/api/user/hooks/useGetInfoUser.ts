import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import { GetUserResponseType } from "./../responseTypes";
import { getUser } from "./../getUser";

export interface HookInterface {
  successCallback?: (data: GetUserResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (id: string) => void;
  responseData: GetUserResponseType | null;
};

export const useGetInfoUser: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | GetUserResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (id: string) => {
      dispatch(
        getUser({
          id,
          pendingCallback: () => {
            setLoading(true);
            componentPendingCallback?.();
          },
          successCallback: (data) => {
            setLoading(false);
            setResponseData(data);
            componentSuccessCallback?.(data);
          },
          failureCallback: (err) => {
            setLoading(false);
            componentFailureCallback?.(err);
          },
        })
      );
    },
    [
      dispatch,
      componentFailureCallback,
      componentPendingCallback,
      componentSuccessCallback,
    ]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
