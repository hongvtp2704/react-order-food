import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import { EditUserRequestType } from "../requestTypes";
import { EditUserResponseType } from "../responseTypes";

import { editUser } from "../editUser";

export interface HookInterface {
  successCallback?: (data: EditUserResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ReturnType = {
  isLoading: boolean;
  runRequest: (data: EditUserRequestType, id: string) => void;
  responseData: EditUserResponseType | null;
};

export const useEditUser: (args: HookInterface) => ReturnType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
  pendingCallback: componentPendingCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<null | EditUserResponseType>(
    null
  );
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (data: EditUserRequestType, id: string) => {
      dispatch(
        editUser({
          data,
          id,
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
    responseData,
    runRequest,
  };
};
