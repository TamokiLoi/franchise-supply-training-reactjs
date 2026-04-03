import type { CustomerAuthProfile } from "@/models";
import { httpClient } from "@/api";
import { API_PATHS } from "@/config";

interface ChangeCustomerStatusPayload {
  is_active: boolean;
}

export const changeCustomerStatus = async (id: string, isActived?: boolean): Promise<CustomerAuthProfile | null> => {
  const payload: ChangeCustomerStatusPayload | undefined =
    typeof isActived === "boolean" ? { is_active: isActived } : undefined;

  return httpClient.patch<CustomerAuthProfile>({
    url: API_PATHS.ADMIN.CUSTOMER.CUSTOMERS_08(id),
    data: payload,
  });
};
