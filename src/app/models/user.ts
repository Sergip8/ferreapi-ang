
export enum UserType {
    customer = "customer",
    distributor = "distributor",
    administrator = "administrator",
    employee = "employee"
}

export interface User {
    user_id: number;
    email: string;
    full_name?: string;
    phone?: string;
    registration_date?: Date;
    last_login?: Date;
    role?: string;
    is_active: boolean;
}

export interface UserPagination {
    items: User[];
    total_count: number;
}

export interface UserListRequest {
    data: User[];
    totalRecords: number;
}

export interface Pagination {
    count: number;
    page: number; 
    size: number;
}

export class SearchParameters {
    search: string = "";
    sort: string = "";
    page: number = 1;
    size: number = 10;
    order: string = "ASC";
    role?: string = "";
}
export interface Customer {
    customer_id: number;
    user_id: number;
    shipping_address?: string;
    billing_address?: string;
    membership_level?: string;
    birth_date?: Date;
    purchase_count?: number;
}

export interface Distributor {
    distributor_id: number;
    user_id: number;
    company_name: string;
    tax_id?: string;
    business_address: string;
    distribution_zone?: string;
    credit_limit?: number;
    contract_date?: Date;
}

export interface Administrator {
    administrator_id: number;
    user_id: number;
    access_level: string;
    department?: string;
    can_create_users?: boolean;
    can_modify_products?: boolean;
    can_view_reports?: boolean;
    assignment_date?: Date;
}

export interface Employee {
    employee_id: number;
    user_id: number;
    position: string;
    department: string;
    hire_date: Date;
    salary?: number;
    supervisor_id?: number;
    employee_number?: string;
    schedule?: string;
}
