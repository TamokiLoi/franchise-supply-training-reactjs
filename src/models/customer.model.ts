export interface CustomerAuthProfile {
  id: string;
  email: string;
  phone: string;
  name: string;
  avatar_url: string;
  address: string;
  is_active?: boolean;
  is_deleted: boolean;
}
