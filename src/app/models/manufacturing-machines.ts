export interface ManufacturingMachine {
  machine_id: number;
  machine_name: string;
  machine_type: string;
  purchase_date?: string;
  last_maintenance_date?: string;
  maintenance_schedule?: string;
  operational_status?: string;
  production_capacity?: string;
  notes?: string;
} 