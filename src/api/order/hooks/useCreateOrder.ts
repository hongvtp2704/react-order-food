import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import { CreateOrderRequestType } from "../requestTypes";
import { CreateOrderResponseType } from "../responseTypes";

import { createOrder } from "../createOrder";

export interface HookInterface {
  successCallback?: (data: CreateOrderResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (data: CreateOrderRequestType) => void;
  responseData: null | CreateOrderResponseType;
};

export const useCreateOrder: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  pendingCallback: componentPendingCallback,
  successCallback: compoenntSuccessCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<null | CreateOrderResponseType>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (data: CreateOrderRequestType) => {
      dispatch(
        createOrder({
          data,
          successCallback: (data) => {
            setLoading(false);
            setResponseData(data);
            compoenntSuccessCallback?.(data);
          },
          pendingCallback: () => {
            setLoading(true);
            componentPendingCallback?.();
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
      compoenntSuccessCallback,
    ]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
