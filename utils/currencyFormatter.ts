import { useEffect } from "react";
import { useLocalizationStore } from "../store/localizationStore";
import { CurrencyFormatOptions, SupportedCurrency } from "../types/currency";
import { useExchangeRates } from "./currencyApi";
import { COMMON_CURRENCY_SYMBOLS } from "./currencySymbols";

const BASE_CURRENCY = "GBP";

export const getCurrencySymbol = (currencyCode: string): string => {
  return COMMON_CURRENCY_SYMBOLS[currencyCode] || currencyCode;
};

const DEFAULT_OPTIONS: CurrencyFormatOptions = {
  displaySymbol: true,
  symbolPosition: "before",
  decimalPlaces: 2,
};

export const useFormatCurrency = () => {
  const { currency, setCurrencyRate } = useLocalizationStore();
  const { data: exchangeRateData, isLoading, isError } = useExchangeRates();

  useEffect(() => {
    if (!isLoading && !isError && exchangeRateData) {
      const rate = exchangeRateData.conversion_rates[currency] || 1;
      setCurrencyRate(rate);
    }
  }, [isLoading, isError, exchangeRateData, currency, setCurrencyRate]);

  const formatCurrency = (
    amount: number,
    options: CurrencyFormatOptions = {},
    fixedCurrency?: { code: SupportedCurrency; rate: number },
  ): string => {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    const currencyToUse = fixedCurrency?.code || currency;
    const locale = mergedOptions.locale || mapCurrencyToLocale(currencyToUse);

    // ✅ Use provided fixed rate if present
    const rateToUse =
      fixedCurrency?.rate ??
      exchangeRateData?.conversion_rates[currencyToUse] ??
      1;

    const convertedAmount = amount * rateToUse;

    const formattedAmount = new Intl.NumberFormat(locale, {
      minimumFractionDigits: mergedOptions.decimalPlaces,
      maximumFractionDigits: mergedOptions.decimalPlaces,
    }).format(convertedAmount);

    const symbol = getCurrencySymbol(currencyToUse);

    if (!mergedOptions.displaySymbol) {
      return formattedAmount;
    }

    return mergedOptions.symbolPosition === "before"
      ? `${symbol}${formattedAmount}`
      : `${formattedAmount}${symbol}`;
  };

  return {
    formatCurrency,
    isLoading,
    isError,
    baseCurrency: BASE_CURRENCY,
    targetCurrency: currency,
  };
};

const mapCurrencyToLocale = (currencyCode: string): string => {
  const currencyToLocale: Record<string, string> = {
    GBP: "en-GB",
    USD: "en-US",
    EUR: "de-DE",
    JPY: "ja-JP",
    CAD: "en-CA",
    AUD: "en-AU",
    INR: "en-IN",
    CNY: "zh-CN",
  };

  return currencyToLocale[currencyCode] || "en-US";
};
