import { ROLE } from "@/models";

export const FAKE_USERS = [
    { id: 1, name: "Admin", email: "admin@gmail.com", role: ROLE.ADMIN},
    { id: 2, name: "Manager", email: "manager@gmail.com", role: ROLE.MANAGER},
    { id: 3, name: "Staff", email: "staff@gmail.com", role: ROLE.STAFF},
    { id: 4, name: "Customer", email: "customer@gmail.com", role: ROLE.CUSTOMER},
]