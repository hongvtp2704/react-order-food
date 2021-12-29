import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "../getCategories";
import { GetCategoriesResponseType } from "../responseTypes";
import { GetCategoriesRequestType } from "../requestTypes";

export interface HookInterface {
  successCallback?: (data: GetCategoriesResponseType) => void;
  failureCallback?: (err: AxiosError) => void;
  pendingCallback?: () => void;
}

type ResponseType = {
  isLoading: boolean;
  responseData: GetCategoriesResponseType | null;
  runRequest: (q?: GetCategoriesRequestType) => void;
};

export const useGetCategories: (args: HookInterface) => ResponseType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] =
    useState<null | GetCategoriesResponseType>(null);
  const dispatch = useDispatch();

  const runRequest = useCallback(
    (q?: GetCategoriesRequestType) => {
      dispatch(
        getCategories({
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
          },
        })
      );
    },
    [dispatch, componentSuccessCallback, componentFailureCallback]
  );

  return {
    isLoading,
    responseData,
    runRequest,
  };
};
