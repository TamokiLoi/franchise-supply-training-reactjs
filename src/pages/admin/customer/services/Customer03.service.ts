import type { SearchCustomerBody } from "../models/api.models";
import type { CustomerAuthProfile } from "@/models";
import { httpClient } from "@/api";
import type { ApiSuccessResponse } from "@/api/http.types";
import { API_PATHS } from "@/config";

export const searchCustomers = async (
  body: SearchCustomerBody,
): Promise<ApiSuccessResponse<CustomerAuthProfile[]> | null> => {
  return httpClient.post<CustomerAuthProfile[]>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_03,
    data: body,
    fullResponse: true,
  });
};
