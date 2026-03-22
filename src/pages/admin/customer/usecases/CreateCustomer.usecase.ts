import type { CustomerAuthProfile } from "@/models";
import { createCustomer } from "../services/Customer02.service";

export const createCustomerUseCase = async (customer: Partial<CustomerAuthProfile>) => {
  const formData = new FormData();

  if (customer.name) formData.append("name", customer.name);
  if (customer.email) formData.append("email", customer.email);
  if (customer.phone) formData.append("phone", customer.phone);
  if (customer.address) formData.append("address", customer.address);
  formData.append("password", "12345678");

  return createCustomer(formData);
};
