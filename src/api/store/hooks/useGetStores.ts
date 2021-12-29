import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getStores } from "../getStores";

import { GetStoresResponseType } from "../responseTypes";
import { GetStoresQueryType } from "../requestTypes";

export interface HookInterface {
  successCallback?: (data: GetStoresResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (q?: GetStoresQueryType) => void;
  responseData: null | GetStoresResponseType;
};

export const useGetStores: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<null | GetStoresResponseType>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (q?: GetStoresQueryType) => {
      dispatch(
        getStores({
          q,
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
      componentSuccessCallback,
      componentFailureCallback,
      componentPendingCallback,
    ]
  );

  return {
    isLoading,
    runRequest,
    responseData,
  };
};
