import { z } from "zod";

export const customerCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.string().min(1, "Email is required").email("Invalid email format"),

  phone: z.string().regex(/^\d{10}$/, "Phone must contain exactly 10 digits"),

  address: z.string().trim().optional().or(z.literal("")),
});

export type CustomerCreateFormValues = z.infer<typeof customerCreateSchema>;
