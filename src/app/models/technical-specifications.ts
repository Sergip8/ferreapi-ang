export interface TechnicalSpecification {
  spec_id: number;
  product_id: number;
  standard_compliance?: string;
  certification_details?: string;
  usage_recommendations?: string;
  installation_guidelines?: string;
  technical_drawing_url?: string;
  safety_information?: string;
} 