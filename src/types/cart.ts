import { Product } from "./catalog";

export interface Cart {
  items: CartItem[];
  totalAmount: string;
}
export interface CartItem extends Product {
  quantity: number;
}
