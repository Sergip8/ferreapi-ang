export interface Inventory {
    minimum_stock_level: number;
    product_id: number;
    warehouse_location: string;
    last_restock_date: string;
    inventory_id: number;
    available_quantity: number;
    reserved_quantity: number;
    maximum_stock_level: number;
    warehouse_id: number;
    last_count_date: string;
    updated_at: string;
}
