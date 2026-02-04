import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const logoutApi = (): Promise<null> => {
  return httpClient.post({ url: API_PATHS.ADMIN.LOGOUT });
};
