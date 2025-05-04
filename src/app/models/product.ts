import { FilterValues } from "./filters";


export interface ProductCard{
    product_code: string;
    name: string;
    description: string;
    regular_price: number;
    sale_price: number;
    material_type_id: number;
    brand_id: number;
    unit_of_measure: string;
    image_url: string;
    category_id: number;
    subcategory_id: number;
    product_id: number;
    material_type_name: string;
    brand_name: string;
    category_name: string;
    parent_category_name: string;
}

export class ProductFilter{
    skip: number = 0
    limit: number = 10
    search?: string | null;
    category_ids?: number[] | null;
    brand_ids?: number[] | null;
    attributes: any
    min_price?: number | string | null;
    max_price?: number | string | null;
    sort_by?: string | null;
    sort_order?: string = "asc";
}

export interface ModelCount<T>{
    data: T
    total: number,
    filter_values: FilterValues

}
export interface EntityPagination<T>{
    data: T,
    total: number,
  
}


export interface Inventory {
  available_quantity: number;
  minimum_stock_level: number;
  warehouse_location: string;
  last_restock_date: string;
  reserved_quantity: number;
  maximum_stock_level: number;
  product_id: number;
  warehouse_id: number;
  last_count_date: string;
}

export interface TechnicalSpecs {
  usage_recommendations: string;
  technical_drawing_url: string;
  standard_compliance: string;
  product_id: number;
  installation_guidelines: string;
  certification_details: string;
  safety_information: string;
}

export interface Product {
  product_code: string;
  name: string;
  description: string;
  regular_price: string;
  sale_price: string | null;
  brand_id: number;
  unit_of_measure: string;
  image_url: string;
  status: string;
  category_id: number;
  subcategory_id: number;
  attributes: any;
  product_id: number;
  created_at: string;
  updated_at: string;
  material_type_name: string | null;
  brand_name: string;
  category_name: string;
  parent_category_name: string;
  inventory: Inventory;
  technical_specs: TechnicalSpecs;
  active_promotions: any[];
  brand: any | null;
  stock_status: string;
}


export interface BasicProduct {
  product_id: number;
  product_code: string;
  name: string;
  description: string;
  regular_price: string;
  sale_price: string;
  image_url: string;
}
