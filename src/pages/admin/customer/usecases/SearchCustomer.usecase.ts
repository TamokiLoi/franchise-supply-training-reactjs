import { searchCustomers } from "../services/Customer03.service";
import type { SearchCustomerBody } from "../models/api.models";

export const searchCustomerUseCase = async (keyword: string, page: number, pageSize: number) => {
  const payload: SearchCustomerBody = {
    searchCondition: {
      keyword,
    },
    pageInfo: {
      pageNum: page,
      pageSize,
    },
  };

  return searchCustomers(payload);
};
