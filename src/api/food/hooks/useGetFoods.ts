import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { GetFoodsResponseType } from "../responseTypes";
import { GetFoodsRequestQueryType } from "../requestTypes";

import { getFoods } from "../getFoods";

export interface HookInterface {
  successCallback?: (data: GetFoodsResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ResponseType = {
  isLoading: boolean;
  runRequest: (q?: GetFoodsRequestQueryType) => void;
  responseData: null | GetFoodsResponseType;
};

export const useGetFoods: (args: HookInterface) => ResponseType = ({
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
    (q?: GetFoodsRequestQueryType) => {
      dispatch(
        getFoods({
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
      componentSuccessCallback,
      componentFailureCallback,
      componentPendingCallback,
      dispatch,
    ]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
