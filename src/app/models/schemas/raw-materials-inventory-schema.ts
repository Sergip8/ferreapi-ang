import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const rawMaterialsInventoryColumns: TableColumn[] = [
  { header: 'ID', field: 'material_id', sortable: true },
  { header: 'Name', field: 'material_name', sortable: true },
  { header: 'Type', field: 'material_type', sortable: true },
  { header: 'Unit', field: 'unit_of_measure', sortable: true },
  { header: 'Quantity', field: 'quantity_available', sortable: true },
  { header: 'Cost', field: 'cost_per_unit', sortable: true },
  { header: 'Supplier', field: 'supplier_id', sortable: true },
  { header: 'Location', field: 'location', sortable: true },
  { header: 'Expiration', field: 'expiration_date', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const rawMaterialsInventorySchema: FormField[] = [
  { key: 'material_name', label: 'Material Name', type: 'text', required: true },
  { key: 'material_type', label: 'Material Type', type: 'text', required: true },
  { key: 'unit_of_measure', label: 'Unit of Measure', type: 'text', required: true },
  { key: 'quantity_available', label: 'Quantity Available', type: 'number', required: true },
  { key: 'cost_per_unit', label: 'Cost Per Unit', type: 'number', required: true },
  { key: 'supplier_id', label: 'Supplier', type: 'number' },
  { key: 'minimum_stock_level', label: 'Minimum Stock Level', type: 'number' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'expiration_date', label: 'Expiration Date', type: 'date' },
  { key: 'last_purchase_date', label: 'Last Purchase Date', type: 'date' },
  { key: 'created_at', label: 'Created At', type: 'date' },
  { key: 'updated_at', label: 'Updated At', type: 'date' }
]; 