import { ENV } from "@/config";
import { LOCAL_STORAGE } from "@/consts";
import { getItemInLocalStorage } from "@/utils";
import axios from "axios";
import { HttpError, type ApiErrorResponse } from "./http.types";

export const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupApi = () => {
  requestInterceptor();
  responseInterceptor();
};

export const requestInterceptor = () => {
  axiosClient.interceptors.request.use(
    (config) => {
      // TODO: after production will remove because BE auto set token in cookie
      const user: any = getItemInLocalStorage(LOCAL_STORAGE.ACCOUNT_USER);
      if (user?.access_token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${user.access_token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const responseInterceptor = () => {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // HTTP error (401, 500...)
      const status = error.response?.status ?? 0;
      const data = error.response?.data as ApiErrorResponse | undefined;

      const message = data?.message ?? data?.errors?.[0]?.message ?? error.message ?? "Request failed";

      throw new HttpError({
        status,
        message,
        errors: data?.errors ?? undefined,
      });
    },
  );
};