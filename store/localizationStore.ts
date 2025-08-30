import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LocalizationState } from "../types/currency";
import { DropdownOption } from "components/Select";

export const useLocalizationStore = create<LocalizationState>()(
  persist(
    (set) => ({
      country: {
        label: "",
        value: "",
      } as DropdownOption,
      currency: "GBP",
      currencyRate: 1,
      language: "en-GB",
      loading: false,
      error: null,

      setCurrency: (currency) => set({ currency }),
      setCountry: (country) => set({ country }),
      setLanguage: (language) => set({ language }),
      setCurrencyRate: (currencyRate) => set({ currencyRate }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "localization-store",
    },
  ),
);
