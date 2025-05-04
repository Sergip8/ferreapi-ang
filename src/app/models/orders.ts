export interface Order {
  order_id: number;
  user_id: number;
  order_date?: string;
  order_total: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  delivery_date?: string;
  tracking_number?: string;
  order_status?: string;
  payment_method?: string;
  shipping_address?: string;
  billing_address?: string;
  notes?: string;
} 