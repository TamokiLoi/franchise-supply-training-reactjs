import { useAuthStore } from "@/stores";
import { logoutApi } from "../services/logout.api";

export const logoutUseCase = async () => {
  try {
    await logoutApi();
  } finally {
    useAuthStore.getState().clearUser();
  }
};
