"use client";

import React from "react";
import { useLocalizationStore } from "store/localizationStore";
import { cn } from "utils/helpers";
import CustomSelect, { DropdownOption } from "./Select";
import CountryDropdown from "./CountryDropdown";

type LocalizationPreferencesProps = {
  className?: string;
  isFooter?: boolean;
};

const LocalizationPreferences: React.FC<LocalizationPreferencesProps> = (
  props,
) => {
  const { className, isFooter } = props;

  const { setCurrency, currency, setCountry, country } = useLocalizationStore();

  const handleCurrencyChange = (option) => {
    setCurrency(option.value);
  };
  const handleCountryChange = (option) => {
    setCountry(option);
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isFooter ? "flex-col md:flex-row" : "",
        className,
      )}
    >
      <div className={cn(isFooter ? "w-full md:w-64" : "w-full")}>
        <CustomSelect
          options={[...currencyOptions] as DropdownOption[]}
          label="Preferred Currency"
          onChange={(option) => handleCurrencyChange(option)}
          selectedOption={{
            label: currency,
            value: currency,
          }}
          variant="minimal"
          menuWidth={"100%"}
          isSearchable
          menuPlacement="top"
        />
      </div>
      <div className={cn(isFooter ? "w-full md:w-64" : "w-full")}>
        <CountryDropdown
          onChange={(option) => handleCountryChange(option)}
          selectedOption={country}
          isPortal
          variant="minimal"
        />
      </div>
      {/* <div className="w-44">
        <CustomSelect
          options={countryOptions}
          onChange={(option) => handleCountryChange(option)}
          selectedOption={{
            label: country,
            value: country,
          }}
          variant="minimal"
          menuWidth={"auto"}
          menuPlacement="top"
          isSearchable
        />
      </div> */}
    </div>
  );
};

export const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "JPY", value: "JPY" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
  { label: "CHF", value: "CHF" },
  { label: "CNY", value: "CNY" },
  { label: "HKD", value: "HKD" },
  { label: "INR", value: "INR" },
] as const;

export default LocalizationPreferences;
