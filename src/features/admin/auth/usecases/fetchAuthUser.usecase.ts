import { useAuthStore } from "@/stores";
import { getProfileApi } from "../services/getProfile.api";

// fetch profile + set store
export const fetchAuthUserUseCase = async () => {
  const profile = await getProfileApi();

  if (!profile) {
    throw new Error("User not authenticated");
  }

  useAuthStore.getState().setUser(profile);
};
