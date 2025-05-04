import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const manufacturingMachinesColumns: TableColumn[] = [
  { header: 'ID', field: 'machine_id', sortable: true },
  { header: 'Name', field: 'machine_name', sortable: true },
  { header: 'Type', field: 'machine_type', sortable: true },
  { header: 'Purchase Date', field: 'purchase_date', sortable: true },
  { header: 'Last Maintenance', field: 'last_maintenance_date', sortable: true },
  { header: 'Status', field: 'operational_status', sortable: true },
  { header: 'Capacity', field: 'production_capacity', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const manufacturingMachinesSchema: FormField[] = [
  { key: 'machine_name', label: 'Machine Name', type: 'text', required: true },
  { key: 'machine_type', label: 'Machine Type', type: 'text', required: true },
  { key: 'purchase_date', label: 'Purchase Date', type: 'date' },
  { key: 'last_maintenance_date', label: 'Last Maintenance Date', type: 'date' },
  { key: 'maintenance_schedule', label: 'Maintenance Schedule', type: 'textarea' },
  { key: 'operational_status', label: 'Operational Status', type: 'text' },
  { key: 'production_capacity', label: 'Production Capacity', type: 'text' },
  { key: 'notes', label: 'Notes', type: 'textarea' }
]; 