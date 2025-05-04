import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const orderDetailsColumns: TableColumn[] = [
  { header: 'ID', field: 'order_detail_id', sortable: true },
  { header: 'Order', field: 'order_id', sortable: true },
  { header: 'Product', field: 'product_id', sortable: true },
  { header: 'Quantity', field: 'quantity', sortable: true },
  { header: 'Unit Price', field: 'unit_price', sortable: true },
  { header: 'Total Price', field: 'total_price', sortable: true },
  { header: 'Discount', field: 'discount_applied', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const orderDetailsSchema: FormField[] = [
  { key: 'order_id', label: 'Order', type: 'number', required: true },
  { key: 'product_id', label: 'Product', type: 'number', required: true },
  { key: 'quantity', label: 'Quantity', type: 'number', required: true },
  { key: 'unit_price', label: 'Unit Price', type: 'number', required: true },
  { key: 'total_price', label: 'Total Price', type: 'number', required: true },
  { key: 'discount_applied', label: 'Discount Applied', type: 'number' }
]; 