
export interface Product {
    id: number;
    name: string;
    category: "Outerwear" | "Footwear" | "Accessories";
    image: string;
    rating: number;
    price: number;
    originalPrice?: number;
    badge: string;
    availability: string;
    inStock: boolean;
}
