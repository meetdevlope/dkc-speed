import { create } from "zustand";

type WishlistCount = {
  userWishlist: string[];
  setUserWishlist: (skuIds: string[]) => void;
  addToUserWishlist: (skuId: string) => void;
  removeUserWishlist: (skuId: string) => void;
  isWishListed: (skuId: string) => boolean;
  emptyWishlistCount: () => void;
};

export const useWishlistCount = create<WishlistCount>((set, get) => ({
  userWishlist: [],
  setUserWishlist: (skuIds) => {
    set(() => {
      return { userWishlist: skuIds };
    });
  },
  addToUserWishlist: (skuId) => {
    set((state) => ({
      userWishlist: [...state.userWishlist, skuId],
    }));
  },
  removeUserWishlist: (skuId) => {
    set((state) => ({
      userWishlist: state.userWishlist.filter((item) => item !== skuId),
    }));
  },
  isWishListed: (skuId) => {
    return get().userWishlist.includes(skuId);
  },
  emptyWishlistCount: () => {
    set(() => ({ userWishlist: [] }));
  },
}));
