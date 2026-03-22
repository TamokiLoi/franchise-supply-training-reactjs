import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { CustomerAuthProfile } from "@/models";

export const createCustomer = (formData: FormData): Promise<CustomerAuthProfile | null> => {
  return httpClient.post<CustomerAuthProfile>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_02,
    data: formData,
  });
};
