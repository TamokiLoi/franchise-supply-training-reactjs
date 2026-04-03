import { changeCustomerStatus } from "../services/Customer08.service";

export const changeStatusCustomerUseCase = async (id: string, isActived?: boolean) => {
  return changeCustomerStatus(id, isActived);
};
