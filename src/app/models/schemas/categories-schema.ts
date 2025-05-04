import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const categoriesColumns: TableColumn[] = [
  { header: 'ID', field: 'category_id', sortable: true },
  { header: 'Name', field: 'category_name', sortable: true },
  { header: 'Parent', field: 'parent_category_id', sortable: true },
  { header: 'Order', field: 'display_order', sortable: true },
  { header: 'Active', field: 'is_active', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const categoriesSchema: FormField[] = [
  { key: 'category_name', label: 'Category Name', type: 'text', required: true },
  { key: 'parent_category_id', label: 'Parent Category', type: 'number' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'image_url', label: 'Image URL', type: 'text' },
  { key: 'is_active', label: 'Is Active', type: 'checkbox' },
  { key: 'created_at', label: 'Created At', type: 'date' },
  { key: 'updated_at', label: 'Updated At', type: 'date' }
]; 