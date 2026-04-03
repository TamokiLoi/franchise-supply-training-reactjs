export const searchConditionFields = {
  keyword: "keyword",
  is_active: "is_active",
  is_deleted: "is_deleted",
} as const;

export interface SearchCondition {
  keyword?: string;
  is_active?: string | boolean;
  is_deleted?: string | boolean;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
}
export interface PageInfoResponse {
  pageNum: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SearchCustomerBody {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface CreateCustomerPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar_url?: string;
  address?: string;
}
