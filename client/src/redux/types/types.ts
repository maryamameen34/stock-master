

export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: string;
    permissions: string[];
    profile_pic? :string ,
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface Order {
    productId: string;
    quantity: number;
    userId: string;
    orderedAt: string; 
  }
export interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    user: User | null;
    users: User[];
    profile_pic: string | null;
    suppliers: User[];
    customers: User[];
}


export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    sku: string;
    main_category: string;
    subcategory: string;
    category: string;
    brand: string;
    tags: [string];
    unit: string;
    main_image?: string;
    additional_images?: [string];
    video_url?: string;
    is_new: boolean;
    attributes: [string];
    variants: [string];
    salePrice: number;
    discount: number;
    stockQuantity: number;
    specifications: [string];
    reviews: [string];
    ratings: number;
    shipping_options: [string];
    shipping_dimentions: [string];
    shipping_cost: string,
    handling_time: string;
    returnPolicy: string;
    warranty: string;
    createdBy: string;
    featured: [string];
    createdAt?: string;
    updatedAt?: string
}

export interface ProductState {
    product: Product | null;
     products: Product[];
    loading: boolean;
    status: string,
    error: string | null;
}


export interface InventoryMovement {
    _id: string;
    productId: string;
    warehouseId: string;
    type: string;
    quantity: number;
    reason: string;
    movementDate: string;
}



export interface InventoryState {
    movements: InventoryMovement[];
    selectedMovement: InventoryMovement | null;
    loading: boolean;
    error: string | null;
}


export interface Warehouse {
    _id?: string;
    name: string;
    location: string;
    capacity: number;
}


export interface WarehouseState {
    warehouses: Warehouse[];
    loading: boolean;
    error: string | null;
}



export interface StockAdjustment {
    _id?: string;
    productId: string;
    quantity: number;
    reason: string;
}

export interface StockAdjustmentState {
    stockAdjustments: StockAdjustment[];
    loading: boolean;
    error: string | null;
}


export  interface SearchState {
    searchTerm: string;
    searchData: any[];
}


export interface FormFields {
    title: string;
    sku: string;
    description: string;
    category: string;
    brand: string;
    price: string;
    main_category: string;
    subcategory: string;
    tags: string;
    unit: string;
    stockQuantity: string;
    is_new: boolean;
    attributes: string;
    variants: string;
    salePrice: number;
    discount: number;
    specifications: string;
    shipping_options: string;
    shipping_dimensions: string;
    shipping_cost: string;
    handling_time: string;
    returnPolicy: string;
    warranty: string;
    createdBy?: string;
    featured: string;
}

export interface FileState {
    main_image: File | null;
    additional_images: File[];
    video_file: File | null;
}


export interface UpdateOrderStatusPayload {
    orderId: string;
    newStatus: string;
  }
