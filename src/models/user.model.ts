import type { Role } from "./role.model";

export type UserLoggedInfo = {
  id: string;
  email: string;
  role: Role;
  phone: string;
  name: string;
};
