import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const customerReturnsColumns: TableColumn[] = [
  { header: 'ID', field: 'return_id', sortable: true },
  { header: 'Order', field: 'order_id', sortable: true },
  { header: 'Product', field: 'product_id', sortable: true },
  { header: 'Quantity', field: 'quantity_returned', sortable: true },
  { header: 'Refund', field: 'refund_amount', sortable: true },
  { header: 'Date', field: 'return_date', sortable: true },
  { header: 'Status', field: 'status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const customerReturnsSchema: FormField[] = [
  { key: 'order_id', label: 'Order', type: 'number', required: true },
  { key: 'product_id', label: 'Product', type: 'number', required: true },
  { key: 'quantity_returned', label: 'Quantity Returned', type: 'number', required: true },
  { key: 'refund_amount', label: 'Refund Amount', type: 'number' },
  { key: 'return_date', label: 'Return Date', type: 'date', required: true },
  { key: 'notes', label: 'Notes', type: 'textarea' },
  { key: 'return_reason', label: 'Return Reason', type: 'text' },
  { key: 'inspection_result', label: 'Inspection Result', type: 'text' },
  { key: 'status', label: 'Status', type: 'text' }
]; 