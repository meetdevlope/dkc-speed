"use client";

import React, { useEffect, useState } from "react";
import { useFormatCurrency } from "../utils/currencyFormatter";
import { CurrencyDisplayProps } from "../types/currency";

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  className = "",
  options = {},
  fixedCurrency,
}) => {
  const { formatCurrency, isLoading } = useFormatCurrency();

  const numericAmount = typeof amount === "string" ? Number(amount) : amount;

  const baseStyles = "font-medium";
  const combinedClassName = className
    ? `${baseStyles} ${className}`
    : baseStyles;

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(isLoading);
  }, [isLoading]);

  if (showLoading) {
    return <div className="shimmer-loading h-5 w-16 rounded" />;
  }

  return (
    <span className={cn("text-sm lg:text-base", combinedClassName)}>
      {formatCurrency(numericAmount, options, fixedCurrency)}
    </span>
  );
};

import { useLocalizationStore } from "../store/localizationStore";
import { useExchangeRates } from "../utils/currencyApi";
import { getCurrencySymbol } from "../utils/currencyFormatter";
import { cn } from "utils/helpers";

export const useRawCurrencyConversion = () => {
  const { currency } = useLocalizationStore();
  const { data: exchangeRateData, isLoading, isError } = useExchangeRates();

  const convertAmount = (amount: number): number => {
    if (isLoading || isError || !exchangeRateData) {
      return amount;
    }

    const rate = exchangeRateData.conversion_rates[currency] || 1;
    return amount * rate;
  };

  return {
    convertAmount,
    isLoading,
    isError,
    currentCurrencyCode: currency,
    currentCurrencySymbol: getCurrencySymbol(currency),
  };
};
