import { CartItem, Product } from "@/types";
import { Cart } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: CartItem[];
  amountTotal: number;
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: {} as Cart,
      cartItems: [],
      amountTotal: 0,

      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
            set({ amountTotal: get().amountTotal + item.price });
          }

          set({ cartItems: [...get().cartItems] });
        } else {
          set({
            cartItems: [...get().cartItems, { ...item, quantity: 1 }],
            amountTotal: get().amountTotal + item.price,
          });
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
