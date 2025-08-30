import { UserWithTotalCartItems } from "types/user.types";
import { create } from "zustand";

type UseAuth = {
  user: UserWithTotalCartItems;
  isAuthenticated: boolean;
  setUser: (userData: UserWithTotalCartItems) => void;
  clearUser: () => void;
};

const emptyUser = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    profile: "",
    verificationCode: "",
    isVerified: false,
    active: false,
    __v: 0,
    orderedItems: 0,
    listedItems: 0,
    documentVerificationId: "",
    documentVerified: false,
    cashWallet: 0,
    creditWallet: 0,
    stripeAccountId: "",
    stripeCustomerId: "",
    countryCode: "",
    eligibleForPayout: false,
    phoneNumber: "",
    commissionType: "cash",
  },
  totalCartItems: "",
};

export const useAuthStore = create<UseAuth>((set) => ({
  user: emptyUser,
  isAuthenticated: false,
  setUser: (userData: UserWithTotalCartItems) => set({ user: userData }),
  clearUser: () => set({ user: emptyUser, isAuthenticated: false }),
}));
