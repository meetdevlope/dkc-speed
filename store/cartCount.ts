import { create } from "zustand";

type CartCount = {
  cartCount: number;
  increment: () => void;
  decrement: () => void;
  emptyCartCount: () => void;
};

export const useCartCount = create<CartCount>((set) => ({
  cartCount: 0,
  increment: () => {
    set((state) => ({ cartCount: state.cartCount + 1 }));
  },
  decrement: () => {
    set((state) => ({ cartCount: state.cartCount - 1 }));
  },
  emptyCartCount: () => {
    set(() => ({ cartCount: 0 }));
  },
}));
