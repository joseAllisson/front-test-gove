export interface Permission {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  children?: Permission[];
}
