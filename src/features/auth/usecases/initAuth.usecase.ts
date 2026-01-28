import { useAuthStore } from "@/stores";
import { fetchAuthUserUseCase } from "./fetchAuthUser.usecase";

export const initAuthUseCase = async () => {
  const { clearUser, markInitialized } = useAuthStore.getState();

  try {
    await fetchAuthUserUseCase();
  } catch {
    clearUser();
  } finally {
    markInitialized();
  }
};
