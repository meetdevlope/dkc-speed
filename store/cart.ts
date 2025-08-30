import { CartResponse } from "types/cart.types";
import { DiscountResponse } from "types/product.types";
import { create } from "zustand";

type CartData = {
  data: CartResponse[];
  delete: (id: string) => void;
  loadingCart: boolean;
  myDiscounts: DiscountResponse;
  emptyCart: () => void;
};

export const useCartStore = create<CartData>((set) => ({
  data: [],
  myDiscounts: {
    discountTitle: "",
    discountMap: {},
  },
  delete: (id) => {
    set((state) => ({ data: state.data.filter((e) => e.cart._id !== id) }));
  },
  loadingCart: true,
  emptyCart: () => {
    set(() => ({ data: [] }));
  },
}));
