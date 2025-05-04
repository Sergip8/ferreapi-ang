export interface RawMaterialsInventory {
  material_id: number;
  material_name: string;
  material_type: string;
  unit_of_measure: string;
  quantity_available: number;
  cost_per_unit: number;
  supplier_id?: number;
  minimum_stock_level?: number;
  location?: string;
  expiration_date?: string;
  last_purchase_date?: string;
  created_at?: string;
  updated_at?: string;
} 