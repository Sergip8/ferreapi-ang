import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const qualityControlColumns: TableColumn[] = [
  { header: 'ID', field: 'quality_check_id', sortable: true },
  { header: 'Batch', field: 'batch_id', sortable: true },
  { header: 'Inspector', field: 'inspector_id', sortable: true },
  { header: 'Check Date', field: 'check_date', sortable: true },
  { header: 'Pressure Test', field: 'pressure_test_result', sortable: true },
  { header: 'Dimensional Check', field: 'dimensional_check_result', sortable: true },
  { header: 'Visual Inspection', field: 'visual_inspection_result', sortable: true },
  { header: 'Status', field: 'status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const qualityControlSchema: FormField[] = [
  { key: 'batch_id', label: 'Batch', type: 'number', required: true },
  { key: 'inspector_id', label: 'Inspector', type: 'number' },
  { key: 'check_date', label: 'Check Date', type: 'date', required: true },
  { key: 'pressure_test_result', label: 'Pressure Test Result', type: 'text' },
  { key: 'dimensional_check_result', label: 'Dimensional Check Result', type: 'text' },
  { key: 'visual_inspection_result', label: 'Visual Inspection Result', type: 'text' },
  { key: 'status', label: 'Status', type: 'text', required: true },
  { key: 'rejection_reason', label: 'Rejection Reason', type: 'textarea' },
  { key: 'notes', label: 'Notes', type: 'textarea' }
]; 