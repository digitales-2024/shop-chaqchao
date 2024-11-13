import { CartItem, Product } from "@/types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  id: string | null;
  cartItems: CartItem[];
  amountTotal: number;
  createCart: () => string;
  addItemToCart: (item: Product, quantity?: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      id: null,
      cartItems: [],
      amountTotal: 0,

      createCart: () => {
        const id = uuid();
        set({ id });
        return id;
      },

      addItemToCart: (item, quantity) => {
        if (get().cartItems.length === 0) {
          set({ amountTotal: 0 });
        }

        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity += quantity || 1;
            if (quantity) {
              set({ amountTotal: get().amountTotal + item.price * quantity });
            } else {
              set({ amountTotal: get().amountTotal + item.price });
            }
          }

          set({ cartItems: [...get().cartItems] });
        } else {
          const newItem = {
            ...item,
            quantity: quantity || 1,
          };

          if (quantity) {
            set({
              cartItems: [...get().cartItems, newItem],
              amountTotal: get().amountTotal + item.price * quantity,
            });
          } else {
            set({
              cartItems: [...get().cartItems, newItem],
              amountTotal: get().amountTotal + item.price,
            });
          }
        }
      },

      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
            set({ amountTotal: get().amountTotal + itemExists.price });
          }

          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = get().cartItems.filter(
                (item) => item.id !== productId,
              );
              set({
                cartItems: updatedCartItems,
                amountTotal: get().amountTotal - itemExists.price,
              });
            } else {
              itemExists.quantity--;
              set({
                cartItems: [...get().cartItems],
                amountTotal: get().amountTotal - itemExists.price,
              });
            }
          }
        }
      },

      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== productId,
            );
            set({
              cartItems: updatedCartItems,
              amountTotal:
                get().amountTotal - itemExists.price * itemExists.quantity,
            });
          }
        }
      },
    }),
    {
      name: "cart",
    },
  ),
);

export default useCartStore;
