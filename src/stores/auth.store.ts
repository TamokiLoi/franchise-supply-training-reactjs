import type { UserLoggedInfo } from "@/models";
import { create } from "zustand";

interface AuthState {
  user: UserLoggedInfo | null;
  isLoggedIn: boolean;
  isInitialized: boolean;

  setUser: (user: UserLoggedInfo) => void;
  clearUser: () => void;
  markInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isInitialized: false,

  setUser: (user) => {
    set({
      user,
      isLoggedIn: true,
    });
  },

  clearUser: () => {
    set({
      user: null,
      isLoggedIn: false,
    });
  },

  markInitialized: () => {
    set({ isInitialized: true });
  },
}));
