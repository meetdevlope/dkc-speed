import { currencyOptions } from "components/LocalizationPreferences";
import { DropdownOption } from "components/Select";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export interface CurrencyFormatOptions {
  locale?: string;
  displaySymbol?: boolean;
  symbolPosition?: "before" | "after";
  decimalPlaces?: number;
}

interface BaseCurrencyDisplayProps {
  amount: number | string;
  className?: string;
  options?: CurrencyFormatOptions;
}

interface WithFixedCurrency extends BaseCurrencyDisplayProps {
  fixedCurrency: {
    code: SupportedCurrency;
    rate: number;
  };
}

interface WithoutFixedCurrency extends BaseCurrencyDisplayProps {
  fixedCurrency?: undefined;
}

export type CurrencyDisplayProps = WithFixedCurrency | WithoutFixedCurrency;

export type SupportedCurrency = (typeof currencyOptions)[number]["value"];

export interface LocalizationState {
  country: DropdownOption;
  currency: string;
  currencyRate: number;
  language: string;
  loading: boolean;
  error: string | null;

  setCurrency: (currency: string) => void;
  setCurrencyRate: (currencyRate: number) => void;
  setCountry: (country: DropdownOption) => void;
  setLanguage: (language: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
