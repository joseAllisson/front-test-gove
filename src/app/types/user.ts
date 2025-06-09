import type { Permission } from "./permission";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  last_login: string;
  user_type: string;
  sector: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  permissions: Permission[];
}

export interface UserFormValues {
    name: string;
    email: string;
    phone: string;
    user_type: string;
    sector: string;
    permissions: number[];
}