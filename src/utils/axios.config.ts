/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from "axios";

import Config from "config";

export const axiosBaseConfig = () => {
  axios.defaults.baseURL = Config.API_URL;
  axios.defaults.headers.common.Accept = "application/json";
  axios.defaults.headers.common["Content-Type"] =
    "application/x-www-form-urlencoded";
};

export const axiosSetAuthToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token || sessionStorage.getItem("user_token") as string}`;
};

export const axiosRemoveAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const setUpInterceptors = () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        axiosRemoveAuthToken();
        sessionStorage.clear();
        window.location.href = `${Config.APP_URL}/login`;
      }
      return Promise.reject(error);
    }
  );
};
