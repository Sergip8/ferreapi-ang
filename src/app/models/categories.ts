export interface Category {
  category_id: number;
  category_name: string;
  parent_category_id?: number;
  display_order?: number;
  description?: string;
  image_url?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
} 