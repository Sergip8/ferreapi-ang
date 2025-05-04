export interface Product {
  product_id: number;
  category_id: number;
  subcategory_id: number;
  attributes: {
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
  regular_price: number;
  sale_price: number;
  brand_id: number;
  status: string;
  product_code: string;
  name: string;
  description: string;
  image_url: string;
  unit_of_measure: string;
}

export interface ProductFilter {
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  category_id?: number;
  subcategory_id?: number;
  brand_id?: number;
  status?: string;
  skip?: number;
  limit?: number;
} 