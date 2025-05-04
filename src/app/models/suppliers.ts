export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
  supplier_type?: string;
  payment_terms?: string;
  lead_time?: number;
  quality_rating?: number;
  active_status?: boolean;
  created_at?: string;
  updated_at?: string;
} 