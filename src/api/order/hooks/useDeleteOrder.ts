import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { DeleteOrderResponseType } from "../responseTypes";

import { deleteOrder } from "../deleteOrder";

export interface HookInterface {
  successCallback?: (data: DeleteOrderResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (orderId: string) => void;
  responseData: DeleteOrderResponseType | null;
};

export const useDeleteOrder: (args: HookInterface) => ReturnType = ({
  successCallback: componentSuccessCallback,
  failureCallback: componentFailureCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<DeleteOrderResponseType | null>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (orderId: string) => {
      dispatch(
        deleteOrder({
          successCallback: (data) => {
            setResponseData(data);
            setLoading(false);
            componentSuccessCallback?.(data);
          },
          orderId,
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
