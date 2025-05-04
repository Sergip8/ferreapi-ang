export interface ShippingDelivery {
  shipping_id: number;
  order_id: number;
  shipping_date?: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  shipping_cost?: number;
  receiver_name?: string;
  delivery_notes?: string;
  carrier_name?: string;
  tracking_number?: string;
  shipping_status?: string;
} 