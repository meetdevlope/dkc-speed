import { CartTypeEnum } from "enums/cartType.enum";
import { create } from "zustand";

type BagConfig = {
  maximumCartQuantity: number;
  pricePerBag: number;
  defaultCartQuantity: number;
  minimumCartQuantity: number;
  allowedCartTypesForQuantity: CartTypeEnum;
  bagImage?: string;
};

type CartUIConfig = {
  bagConfig: BagConfig;

  setValues: (values: Partial<CartUIConfig>) => void;
  setBagConfig: (config: Partial<BagConfig>) => void;

  isConfigLoaded: boolean;
  setConfigLoaded: (loaded: boolean) => void;
};

export const useCartUIConfigStore = create<CartUIConfig>((set) => ({
  bagConfig: {
    allowedCartTypesForQuantity: CartTypeEnum.bag,
    defaultCartQuantity: 1,
    maximumCartQuantity: 3,
    minimumCartQuantity: 1,
    pricePerBag: 2,
  },

  isConfigLoaded: false,

  setValues: (values: Partial<CartUIConfig>) =>
    set((state) => ({
      ...state,
      ...values,
    })),

  setBagConfig: (config: Partial<BagConfig>) =>
    set((state) => ({
      ...state,
      bagConfig: {
        ...state.bagConfig,
        ...config,
      },
    })),

  setConfigLoaded: (loaded: boolean) => set({ isConfigLoaded: loaded }),
}));
