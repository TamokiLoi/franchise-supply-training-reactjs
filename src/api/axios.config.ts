import { ENV } from "@/config";
import { refreshAdminTokenApi, refreshCustomerTokenApi } from "@/features";
import { useAdminAuthStore, useCustomerAuthStore } from "@/stores";
import axios, { HttpStatusCode } from "axios";
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
      const url = config.url || "";

      let token = null;

      // client API
      if (url.startsWith("api/client")) {
        const storage = localStorage.getItem("customer-auth-storage");
        
        if (storage) {
          const parsed = JSON.parse(storage);
          token = parsed?.state?.accessToken;
        }
      }

      // admin API
      else {
        const storage = localStorage.getItem("admin-auth-storage");

        if (storage) {
          const parsed = JSON.parse(storage);
          token = parsed?.state?.accessToken;
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const responseInterceptor = () => {
  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status ?? 0;
      const data = error.response?.data as ApiErrorResponse | undefined;

      const message =
        data?.message ??
        (data?.errors?.length ? data.errors.map((e) => e.message).join(", ") : undefined) ??
        error.message ??
        "Request failed";

      console.log("INTERCEPTOR HIT");
      console.log("data", data);

      const originalRequest = error.config;

      // ✅ Handle 401
      if (status === HttpStatusCode.Unauthorized && !originalRequest?._retry) {
        originalRequest._retry = true;

        const url = originalRequest?.url ?? "";
        const pathname = new URL(url, window.location.origin).pathname;

        const isAdminApi = pathname.startsWith("/api/auth") && message === "ACCESS_TOKEN_EXPIRED";
        const isClientApi = pathname.startsWith("/api/customer-auth") && message === "CUSTOMER_ACCESS_TOKEN_EXPIRED";

        try {
          if (isAdminApi) {
            console.log("REFRESH TOKEN CALLED");
            await refreshAdminTokenApi();
          }

          if (isClientApi) {
            console.log("REFRESH TOKEN CALLED");
            await refreshCustomerTokenApi();
          }

          return axiosClient(originalRequest);
        } catch {
          if (isAdminApi) {
            useAdminAuthStore.getState().clearUser();
          }

          if (isClientApi) {
            useCustomerAuthStore.getState().clearCustomer();
          }
        }
      }

      throw new HttpError({
        status,
        message,
        errors: data?.errors ?? [],
      });
    },
  );
};
