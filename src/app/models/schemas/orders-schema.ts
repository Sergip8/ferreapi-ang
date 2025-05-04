import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const ordersColumns: TableColumn[] = [
  { header: 'ID', field: 'order_id', sortable: true },
  { header: 'User', field: 'user_id', sortable: true },
  { header: 'Order Date', field: 'order_date', sortable: true },
  { header: 'Total', field: 'order_total', sortable: true },
  { header: 'Tax', field: 'tax_amount', sortable: true },
  { header: 'Shipping', field: 'shipping_cost', sortable: true },
  { header: 'Discount', field: 'discount_amount', sortable: true },
  { header: 'Status', field: 'order_status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const ordersSchema: FormField[] = [
  { key: 'user_id', label: 'User', type: 'number', required: true },
  { key: 'order_date', label: 'Order Date', type: 'date' },
  { key: 'order_total', label: 'Order Total', type: 'number', required: true },
  { key: 'tax_amount', label: 'Tax Amount', type: 'number', required: true },
  { key: 'shipping_cost', label: 'Shipping Cost', type: 'number', required: true },
  { key: 'discount_amount', label: 'Discount Amount', type: 'number', required: true },
  { key: 'delivery_date', label: 'Delivery Date', type: 'date' },
  { key: 'tracking_number', label: 'Tracking Number', type: 'text' },
  { key: 'order_status', label: 'Order Status', type: 'text' },
  { key: 'payment_method', label: 'Payment Method', type: 'text' },
  { key: 'shipping_address', label: 'Shipping Address', type: 'textarea' },
  { key: 'billing_address', label: 'Billing Address', type: 'textarea' },
  { key: 'notes', label: 'Notes', type: 'textarea' }
]; 