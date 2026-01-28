import type { LoginPayload } from "../models";
import { loginApi } from "../services";

export const loginUseCase = async (payload: LoginPayload) => {
   await loginApi(payload);
};
