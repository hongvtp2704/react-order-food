import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import { GetOrdersByUserResponseType } from "../responseTypes";
import { GetOrdersByUserQueryType } from "../requestTypes";

import { getOrdersByUser } from "../getOrderByUser";

export interface HookInterface {
  successCallback?: (data: GetOrdersByUserResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (userId: string, q?: GetOrdersByUserQueryType) => void;
  responseData: null | GetOrdersByUserResponseType;
};

export const useGetOrderByUser: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: compoenntPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<null | GetOrdersByUserResponseType>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (id: string, q?: GetOrdersByUserQueryType) => {
      dispatch(
        getOrdersByUser({
          id,
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
            compoenntPendingCallback?.();
          },
        })
      );
    },
    [
      dispatch,
      compoenntPendingCallback,
      componentFailureCallback,
      componentSuccessCallback,
    ]
  );

  return {
    isLoading,
    runRequest,
    responseData,
  };
};
