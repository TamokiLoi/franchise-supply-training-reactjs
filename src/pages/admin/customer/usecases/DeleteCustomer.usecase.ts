import { deleteSoftCustomer } from "../services/Customer04.service";

export const deleteCustomerUseCase = async (id: string) => {
  return deleteSoftCustomer(id);
};
