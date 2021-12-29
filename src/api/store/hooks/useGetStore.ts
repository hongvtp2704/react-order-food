import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getStore } from "../getStore";

import { GetStoreResponseType } from "../responseTypes";

export interface HookInterface {
  successCallback?: (data: GetStoreResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (id: string) => void;
  responseData: null | GetStoreResponseType;
};

export const useGetStore: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | GetStoreResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (id: string) => {
      dispatch(
        getStore({
          id,
          successCallback: (data) => {
            setLoading(false);
            setResponseData(data);
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
