import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { LoginPayload } from "../models";

export const loginApi = (payload: LoginPayload): Promise<null> => {
  return httpClient.post<null, LoginPayload>({
    url: API_PATHS.ADMIN.AUTH,
    data: payload,
  });
};
