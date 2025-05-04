export interface Promotion {
  promotion_id: number;
  promotion_name: string;
  promotion_type: string;
  start_date: string;
  end_date: string;
  product_id?: number;
  category_id?: number;
  discount_percentage?: number;
  discount_amount?: number;
  minimum_purchase?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
} 