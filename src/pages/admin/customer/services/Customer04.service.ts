import type { CustomerAuthProfile } from "@/models";
import { httpClient } from "@/api";

import { API_PATHS } from "@/config";

export const deleteSoftCustomer = async (id: string): Promise<CustomerAuthProfile | null> => {
  return httpClient.delete<CustomerAuthProfile>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_0456(id),
  });
};
