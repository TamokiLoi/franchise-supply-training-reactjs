import type { CustomerAuthProfile } from "@/models";
import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

export const restoreCustomer = async (id: string): Promise<CustomerAuthProfile | null> => {
  return httpClient.patch<CustomerAuthProfile>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_07(id),
  });
};
