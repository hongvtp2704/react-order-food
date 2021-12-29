import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { GetFoodsResponseType } from "../responseTypes";
import { GetFoodsRequestQueryType } from "../requestTypes";

import { getFoodByCategory } from "../getFoodsByCategory";

export interface HookInterface {
  successCallback?: (data: GetFoodsResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  responseData: null | GetFoodsResponseType;
  runRequest: (cateId: string, q?: GetFoodsRequestQueryType) => void;
};

export const useGetFoodByCategory: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | GetFoodsResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (cateId: string, q?: GetFoodsRequestQueryType) => {
      dispatch(
        getFoodByCategory({
          cateId,
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
    runRequest,
    responseData,
  };
};
