import { httpClient } from "@/api";
import { API_PATHS } from "@/config";
import type { CustomerAuthProfile } from "@/models";

export const getCustomerByID = (
  customerId: string,
): Promise<CustomerAuthProfile | null> => {
  return httpClient.get({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_0456(customerId),
  });
};
