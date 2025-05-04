export interface QualityControl {
  quality_check_id: number;
  batch_id: number;
  inspector_id?: number;
  check_date: string;
  pressure_test_result?: string;
  dimensional_check_result?: string;
  visual_inspection_result?: string;
  status: string;
  rejection_reason?: string;
  notes?: string;
} 