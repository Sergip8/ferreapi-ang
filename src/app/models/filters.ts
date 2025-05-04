export enum QueryFilterParam{
  SORT_BY = "sort_by",
  SORT_ORDER = "sort_order",
  PAGE = "page",
  SEARCH = "search",
  CATEGORY = "cat",
  BRAND = "brand",
  PRICE_MAX = "price_max",
  PRICE_MIN = "price_min",
  ATTRIBUTES = "attr"
}

export interface Brand {
  id: number;
  name: string;
  count: number;
  selected: boolean;
}

export interface Category {
  id: number;
  name: string;
  parent_name: string;
  count: number;
  selected?: boolean;
}

export interface AttributeValue {
  value: string;
  count: number;
  selected?: boolean;
}

export interface Attribute {
  name: string;
  values: AttributeValue[];
  expanded?: boolean;
}

export class PriceRange {
  min: string = "";
  max: string = "";
}
export class Sort{
  field: string = "product_id"
  direction: string = "asc"
}


export class FilterValues {
  brands: Brand[] = [];
  categories: Category[] = [];
  attributes: Attribute[] = [];
  price_range: PriceRange = new PriceRange();
  sort: Sort = new Sort()
  search: string = ""
}