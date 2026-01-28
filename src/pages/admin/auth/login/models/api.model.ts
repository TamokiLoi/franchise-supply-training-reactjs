import type { Role } from "@/models";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfile {
    id: string;
    email: string;
    role: Role;
    phone: string;
    name: string;
}
