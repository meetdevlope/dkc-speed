import { PaymentOptionType, ShipmentOptionsResponse } from "types/cart.types";
import { create } from "zustand";

export type CardDetailsType = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardHolderName: string;
  useShippingAsBilling: boolean;
};

export type AddressType = string;

export enum PaymentMode {
  EXPRESS = "express",
  PAY_LATER = "pay-later",
  STANDARD = "standard",
}

export interface CheckoutState {
  paymentMode:
    | PaymentMode.EXPRESS
    | PaymentMode.PAY_LATER
    | PaymentMode.STANDARD;

  expressCheckout: PaymentOptionType | null;

  paymentMethodId: string | null;

  shipment: ShipmentOptionsResponse | null;

  address: AddressType;

  saveForFuture: boolean;

  cardDetails: CardDetailsType;

  phoneNumber: string;

  setPaymentMode: (option: PaymentMode) => void;
  setExpressCheckout: (option: PaymentOptionType | null) => void;
  setShipment: (option: ShipmentOptionsResponse | null) => void;
  setAddress: (address: AddressType) => void;
  setPaymentMethodId: (id: string) => void;
  setSaveForFuture: (save: boolean) => void;
  setCardDetails: (details: Partial<CardDetailsType>) => void;
  setPhoneNumber: (number: string) => void;
  resetCheckout: () => void;
}

const initialState = {
  expressCheckout: null,
  paymentMode: PaymentMode.STANDARD,
  shipment: null,
  address: "",
  paymentMethodId: "",
  saveForFuture: false,
  cardDetails: {
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardHolderName: "",
    useShippingAsBilling: true,
  },
  phoneNumber: "",
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  ...initialState,

  setPaymentMode: (mode: PaymentMode) => set({ paymentMode: mode }),

  setExpressCheckout: (option) => set({ expressCheckout: option }),

  setShipment: (option) => set({ shipment: option }),

  setAddress: (address) => set({ address }),

  setSaveForFuture: (save) => set({ saveForFuture: save }),

  setCardDetails: (details) =>
    set((state) => ({
      cardDetails: { ...state.cardDetails, ...details },
    })),

  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPaymentMethodId: (id) => set({ paymentMethodId: id }),

  resetCheckout: () => set(initialState),
}));
