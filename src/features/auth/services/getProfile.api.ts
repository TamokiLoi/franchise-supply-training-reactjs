import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { UserLoggedInfo } from "@/models";

export const getProfileApi = (): Promise<UserLoggedInfo | null> => {
  return httpClient.get<UserLoggedInfo>({
    url: API_PATHS.ADMIN.GET_PROFILE,
  });
};
