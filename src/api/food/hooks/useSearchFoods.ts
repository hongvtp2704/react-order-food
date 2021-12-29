import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { GetFoodsResponseType } from "../responseTypes";

import { SearchFoodsRequestQueryType } from "../requestTypes";
import { searchFoods } from "../searchFoods";

export interface HookInterface {
  successCallback?: (data: GetFoodsResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (q?: SearchFoodsRequestQueryType) => void;
  responseData: GetFoodsResponseType | null;
};

export const useSearchFoods: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  pendingCallback: componentPendingCallback,
  successCallback: componentSuccessCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<GetFoodsResponseType | null>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (q?: SearchFoodsRequestQueryType) => {
      dispatch(
        searchFoods({
          q,
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
