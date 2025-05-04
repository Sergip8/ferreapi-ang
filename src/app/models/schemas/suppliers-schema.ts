import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const suppliersColumns: TableColumn[] = [
  { header: 'ID', field: 'supplier_id', sortable: true },
  { header: 'Name', field: 'supplier_name', sortable: true },
  { header: 'Contact', field: 'contact_person', sortable: true },
  { header: 'Phone', field: 'phone', sortable: true },
  { header: 'Email', field: 'email', sortable: true },
  { header: 'Type', field: 'supplier_type', sortable: true },
  { header: 'Active', field: 'active_status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const suppliersSchema: FormField[] = [
  { key: 'supplier_name', label: 'Supplier Name', type: 'text', required: true },
  { key: 'contact_person', label: 'Contact Person', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'address', label: 'Address', type: 'textarea' },
  { key: 'supplier_type', label: 'Supplier Type', type: 'text' },
  { key: 'payment_terms', label: 'Payment Terms', type: 'text' },
  { key: 'lead_time', label: 'Lead Time', type: 'number' },
  { key: 'quality_rating', label: 'Quality Rating', type: 'number' },
  { key: 'active_status', label: 'Active Status', type: 'checkbox' },
  { key: 'created_at', label: 'Created At', type: 'date' },
  { key: 'updated_at', label: 'Updated At', type: 'date' }
]; 