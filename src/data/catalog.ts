export interface SubCategory {
    id: string;
    name: string;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    subCategory: SubCategory;
    type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Stock {
    id: string;
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
    id: string;
    price: number;
    color?: { id: string; name: string };
    size?: { id: string; name: string };
    productId: string;
    type?: string;
    image?: string;
    stock: Stock;
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

export const categories: Category[] = [
    { id: "cat-electronics", name: "Electronics" },
    { id: "cat-fashion", name: "Fashion" },
    { id: "cat-home", name: "Home" },
    { id: "cat-outdoor", name: "Outdoor" },
];

export const products: Product[] = [
    {
        id: "prd-1001",
        name: "Studio Wireless Headphones",
        description: "Over-ear wireless headphones with active noise cancellation and 40-hour battery life.",
        subCategory: { id: "sub-audio", name: "Headphones", categoryId: "cat-electronics" },
        type: "audio",
    },
    {
        id: "prd-1002",
        name: "Everyday Smart Watch",
        description: "A bright AMOLED display, health tracking, and a battery that lasts all week.",
        subCategory: { id: "sub-wearables", name: "Smart watches", categoryId: "cat-electronics" },
        type: "wearable",
    },
    {
        id: "prd-1003",
        name: "Trail Daypack 22L",
        description: "A lightweight water-resistant daypack made for commutes and weekend trails.",
        subCategory: { id: "sub-bags", name: "Backpacks", categoryId: "cat-outdoor" },
        type: "daypack",
    },
    {
        id: "prd-1004",
        name: "Cloudfoam Everyday Sneakers",
        description: "Cushioned everyday sneakers with a breathable knit upper and grippy sole.",
        subCategory: { id: "sub-footwear", name: "Footwear", categoryId: "cat-fashion" },
        type: "footwear",
    },
    {
        id: "prd-1005",
        name: "Pocket Bluetooth Speaker",
        description: "Room-filling sound in a compact, splash-resistant speaker for wherever you go.",
        subCategory: { id: "sub-audio", name: "Speakers", categoryId: "cat-electronics" },
        type: "audio",
    },
    {
        id: "prd-1006",
        name: "Mirrorless Travel Camera",
        description: "A compact 24-megapixel camera with fast autofocus and crisp 4K video.",
        subCategory: { id: "sub-cameras", name: "Cameras", categoryId: "cat-electronics" },
        type: "camera",
    },
    {
        id: "prd-1007",
        name: "Arc Table Light",
        description: "A sculptural LED table lamp with warm dimming and a soft-touch finish.",
        subCategory: { id: "sub-lighting", name: "Lighting", categoryId: "cat-home" },
        type: "lighting",
    },
    {
        id: "prd-1008",
        name: "Compact Air Fryer 4.2L",
        description: "Crispy weeknight favorites with less oil, easy presets, and a quick-clean basket.",
        subCategory: { id: "sub-kitchen", name: "Kitchen appliances", categoryId: "cat-home" },
        type: "kitchen appliance",
    },
];

export const variants: Variant[] = [
    {
        id: "var-2001",
        productId: "prd-1001",
        price: 5499,
        type: "Midnight",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3001", quantityTotal: 40, quantityAvailable: 26, quantityReserved: 3, quantityOrdered: 11, productId: "prd-1001", locationId: "loc-west", status: "available" },
    },
    {
        id: "var-2002",
        productId: "prd-1002",
        price: 7299,
        type: "Graphite",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3002", quantityTotal: 32, quantityAvailable: 18, quantityReserved: 2, quantityOrdered: 12, productId: "prd-1002", locationId: "loc-west", status: "available" },
    },
    {
        id: "var-2003",
        productId: "prd-1003",
        price: 2899,
        type: "Olive",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3003", quantityTotal: 54, quantityAvailable: 41, quantityReserved: 4, quantityOrdered: 9, productId: "prd-1003", locationId: "loc-north", status: "available" },
    },
    {
        id: "var-2004",
        productId: "prd-1004",
        price: 3199,
        type: "White / 8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3004", quantityTotal: 60, quantityAvailable: 37, quantityReserved: 6, quantityOrdered: 17, productId: "prd-1004", locationId: "loc-north", status: "available" },
    },
    {
        id: "var-2005",
        productId: "prd-1005",
        price: 1999,
        type: "Sand",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3005", quantityTotal: 46, quantityAvailable: 29, quantityReserved: 3, quantityOrdered: 14, productId: "prd-1005", locationId: "loc-east", status: "available" },
    },
    {
        id: "var-2006",
        productId: "prd-1006",
        price: 42999,
        type: "Black",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3006", quantityTotal: 12, quantityAvailable: 6, quantityReserved: 1, quantityOrdered: 5, productId: "prd-1006", locationId: "loc-east", status: "available" },
    },
    {
        id: "var-2007",
        productId: "prd-1007",
        price: 2499,
        type: "Warm white",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3007", quantityTotal: 25, quantityAvailable: 16, quantityReserved: 2, quantityOrdered: 7, productId: "prd-1007", locationId: "loc-west", status: "available" },
    },
    {
        id: "var-2008",
        productId: "prd-1008",
        price: 5899,
        type: "Chalk",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
        stock: { id: "stk-3008", quantityTotal: 19, quantityAvailable: 8, quantityReserved: 2, quantityOrdered: 9, productId: "prd-1008", locationId: "loc-south", status: "available" },
    },
];

export const presentationByProductId: Record<string, ProductPresentation> = {
    "prd-1001": { brand: "Soundcore", rating: 4.7, ratingCount: 2841, compareAtPrice: 7999, badge: "Bestseller", deliveryLabel: "Tomorrow" },
    "prd-1002": { brand: "Amazfit", rating: 4.5, ratingCount: 1932, compareAtPrice: 9999, badge: "Top rated", deliveryLabel: "Tomorrow" },
    "prd-1003": { brand: "Wildcraft", rating: 4.6, ratingCount: 816, compareAtPrice: 3999, deliveryLabel: "Tomorrow" },
    "prd-1004": { brand: "Campus", rating: 4.3, ratingCount: 1206, compareAtPrice: 4999, badge: "Popular", deliveryLabel: "Tomorrow" },
    "prd-1005": { brand: "JBL", rating: 4.6, ratingCount: 3517, compareAtPrice: 2999, badge: "Bestseller", deliveryLabel: "Tomorrow" },
    "prd-1006": { brand: "Canon", rating: 4.8, ratingCount: 428, compareAtPrice: 46999, deliveryLabel: "Tomorrow" },
    "prd-1007": { brand: "Home Centre", rating: 4.4, ratingCount: 692, compareAtPrice: 3499, deliveryLabel: "Tomorrow" },
    "prd-1008": { brand: "Philips", rating: 4.5, ratingCount: 998, compareAtPrice: 7999, deliveryLabel: "Tomorrow" },
};

export const brandOptions = [...new Set(Object.values(presentationByProductId).map(({ brand }) => brand))];
