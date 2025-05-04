export interface CustomerReturn {
  return_id: number;
  order_id: number;
  product_id: number;
  quantity_returned: number;
  refund_amount?: number;
  return_date: string;
  notes?: string;
  return_reason?: string;
  inspection_result?: string;
  status?: string;
} 