import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const promotionsColumns: TableColumn[] = [
  { header: 'ID', field: 'promotion_id', sortable: true },
  { header: 'Name', field: 'promotion_name', sortable: true },
  { header: 'Type', field: 'promotion_type', sortable: true },
  { header: 'Start', field: 'start_date', sortable: true },
  { header: 'End', field: 'end_date', sortable: true },
  { header: 'Discount %', field: 'discount_percentage', sortable: true },
  { header: 'Discount Amt', field: 'discount_amount', sortable: true },
  { header: 'Status', field: 'status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const promotionsSchema: FormField[] = [
  { key: 'promotion_name', label: 'Promotion Name', type: 'text', required: true },
  { key: 'promotion_type', label: 'Promotion Type', type: 'text', required: true },
  { key: 'start_date', label: 'Start Date', type: 'date', required: true },
  { key: 'end_date', label: 'End Date', type: 'date', required: true },
  { key: 'product_id', label: 'Product', type: 'number' },
  { key: 'category_id', label: 'Category', type: 'number' },
  { key: 'discount_percentage', label: 'Discount Percentage', type: 'number' },
  { key: 'discount_amount', label: 'Discount Amount', type: 'number' },
  { key: 'minimum_purchase', label: 'Minimum Purchase', type: 'number' },
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'created_at', label: 'Created At', type: 'date' },
  { key: 'updated_at', label: 'Updated At', type: 'date' }
]; 