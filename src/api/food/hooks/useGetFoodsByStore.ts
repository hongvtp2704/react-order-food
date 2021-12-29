import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getFoodsByStore } from "../getFoodsByStore";

import { GetFoodsRequestQueryType } from "../requestTypes";
import { GetFoodsResponseType } from "../responseTypes";

export interface HookInterface {
  successCallback?: (data: GetFoodsResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (storeId: string, q?: GetFoodsRequestQueryType) => void;
  responseData: null | GetFoodsResponseType;
};

export const useGetFoodsByStore: (args: HookInterface) => ReturnType = ({
  successCallback: componentSuccessCallback,
  failureCallback: componentFailureCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | GetFoodsResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (storeId: string, q?: GetFoodsRequestQueryType) => {
      dispatch(
        getFoodsByStore({
          storeId,
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
