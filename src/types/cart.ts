import { Product } from "./catalog";

export interface Cart {
  id: string;
  cartItems: CartItem[];
  amountTotal: number;
}
export interface CartItem extends Product {
  quantity: number;
}

export type CreateCart = {
  tempId?: string;
  clientId?: string;
};

export type CheckoutCart = {
  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  someonePickup: boolean;
  shippingToAnotherCity: boolean;
  comments?: string;
  pickupTime: Date;
  clientId?: string;
};
