import type { CustomerAuthProfile } from "@/models";
import { httpClient } from "@/api";

import { API_PATHS } from "@/config";

export const updateCustomer = async (body: CustomerAuthProfile): Promise<CustomerAuthProfile | null> => {
  return httpClient.put<CustomerAuthProfile>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_0456(body.id),
    data: body,
  });
};
