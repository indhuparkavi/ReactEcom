export interface Category {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SubCategory {
    id?: string;
    name: string;
    categoryId: string;
}

export interface Product {
    id?: string;
    name: string;
    description: string;
    subCategory: SubCategory;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Stock {
    id?: string;
    quantityTotal: number;
    quantityAvailable: number;
    quantityReserved?: number;
    quantityOrdered?: number;
    productId: string;
    locationId: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Variant {
    id?: string;
    price: number;
    color?: { id?: string; name: string };
    size?: { id?: string; name: string };
    productId: string;
    product?: Product;
    type?: string;
    image?: string;
    stock: Stock;
    createdAt?: string;
    updatedAt?: string;
}

export interface Role {
    id: string;
    name?: string;
    createdAt?: string;
}

export interface Profile {
    id?: string;
    name?: string;
    contact?: string;
    email?: string;
    gender?: string;
    dob?: string;
    gst?: string;
    pan?: string;
    businessType?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Address {
    id?: string;
    addressType?: "HOME" | "WORK" | "OTHER";
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    default?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id?: string;
    role: Role;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
    profile?: Profile;
    addresses?: Address[];
}

export type OrderStatus = "Pending" | "cancelled" | "Completed";
export type OrderType = "Purchase" | "Transfer" | "Sales";

export interface Order {
    id?: string;
    orderNo?: string;
    customer?: User;
    quantity: number;
    status: OrderStatus;
    price: number;
    orderedDate: string;
    updatedAt?: string;
    orderedBy: string;
    orderType: OrderType;
    supplierName?: string;
    fromLocationId?: string;
    toLocationId?: string;
}

export interface Invoice {
    id?: string;
    invoiceNo: string;
    product: Product;
    order?: Order;
    quantity: number;
    expiredDate?: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy: string;
    productId: string;
    user?: User;
}

export interface Payment {
    id?: string;
    status: string;
    invoice: Invoice;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductPresentation {
    brand: string;
    rating: number;
    ratingCount: number;
    compareAtPrice: number;
    badge?: string;
    deliveryLabel: string;
}

export interface CatalogProduct {
    product: Product;
    variant: Variant;
    presentation: ProductPresentation;
}

export interface OrderLine {
    productId: string;
    variantId: string;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
}

export interface CheckoutReceipt {
    order: Order;
    items: OrderLine[];
    invoices: Invoice[];
    payments: Payment[];
    shippingAddress: Address;
}