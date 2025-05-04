import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const productionBatchesColumns: TableColumn[] = [
  { header: 'ID', field: 'batch_id', sortable: true },
  { header: 'Product', field: 'product_id', sortable: true },
  { header: 'Production Date', field: 'production_date', sortable: true },
  { header: 'Quantity', field: 'quantity_produced', sortable: true },
  { header: 'Machine', field: 'machine_id', sortable: true },
  { header: 'Cost', field: 'production_cost', sortable: true },
  { header: 'Operator', field: 'operator_id', sortable: true },
  { header: 'Quality Check', field: 'quality_check_status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const productionBatchesSchema: FormField[] = [
  { key: 'product_id', label: 'Product', type: 'number', required: true },
  { key: 'production_date', label: 'Production Date', type: 'date', required: true },
  { key: 'quantity_produced', label: 'Quantity Produced', type: 'number', required: true },
  { key: 'machine_id', label: 'Machine', type: 'number' },
  { key: 'production_cost', label: 'Production Cost', type: 'number' },
  { key: 'operator_id', label: 'Operator', type: 'number' },
  { key: 'material_used', label: 'Material Used', type: 'textarea' },
  { key: 'quality_check_status', label: 'Quality Check Status', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
  { key: 'created_at', label: 'Created At', type: 'date' }
]; 