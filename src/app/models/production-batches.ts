export interface ProductionBatch {
  batch_id: number;
  product_id: number;
  production_date: string;
  quantity_produced: number;
  machine_id?: number;
  production_cost?: number;
  operator_id?: number;
  material_used?: string;
  quality_check_status?: string;
  notes?: string;
  created_at?: string;
} 