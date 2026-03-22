import { restoreCustomer } from "../services/Customer07.service";

export const restoreCustomerUseCase = async (id: string) => {
  return restoreCustomer(id);
};
