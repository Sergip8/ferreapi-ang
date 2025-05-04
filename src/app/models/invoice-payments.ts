export interface InvoicePayment {
  invoice_id: number;
  order_id: number;
  due_date: string;
  total_amount: number;
  tax_amount: number;
  payment_date?: string;
  invoice_date: string;
  invoice_number: string;
  notes?: string;
  payment_method?: string;
  payment_status?: string;
} 