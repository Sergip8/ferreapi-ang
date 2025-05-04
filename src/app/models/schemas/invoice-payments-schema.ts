import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const invoicePaymentsColumns: TableColumn[] = [
  { header: 'ID', field: 'invoice_id', sortable: true },
  { header: 'Order', field: 'order_id', sortable: true },
  { header: 'Due Date', field: 'due_date', sortable: true },
  { header: 'Total', field: 'total_amount', sortable: true },
  { header: 'Tax', field: 'tax_amount', sortable: true },
  { header: 'Payment Date', field: 'payment_date', sortable: true },
  { header: 'Invoice Date', field: 'invoice_date', sortable: true },
  { header: 'Number', field: 'invoice_number', sortable: true },
  { header: 'Status', field: 'payment_status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const invoicePaymentsSchema: FormField[] = [
  { key: 'order_id', label: 'Order', type: 'number', required: true },
  { key: 'due_date', label: 'Due Date', type: 'date', required: true },
  { key: 'total_amount', label: 'Total Amount', type: 'number', required: true },
  { key: 'tax_amount', label: 'Tax Amount', type: 'number', required: true },
  { key: 'payment_date', label: 'Payment Date', type: 'date' },
  { key: 'invoice_date', label: 'Invoice Date', type: 'date', required: true },
  { key: 'invoice_number', label: 'Invoice Number', type: 'text', required: true },
  { key: 'notes', label: 'Notes', type: 'textarea' },
  { key: 'payment_method', label: 'Payment Method', type: 'text' },
  { key: 'payment_status', label: 'Payment Status', type: 'text' }
]; 