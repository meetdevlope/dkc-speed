import { useQuery } from "@tanstack/react-query";
import { useCityStateCountry } from "hooks/useCityStateCountry";
import { useToggle } from "hooks/useToggle";
import React, { useEffect, useMemo, useState } from "react";
import { SingleValue } from "react-select";
import { cn } from "utils/helpers";
import { Input } from "./Input";
import CustomSelect, { DropdownOption } from "./Select";
import Spinner from "./spinner/Spinner";

type PhoneInputProps = {
  label: string;
  onChange: any;
  value?: {
    label: string;
    value: string; // format: +XX:123456789
  };
  className?: string;
};

const PhoneInput: React.FC<PhoneInputProps> = (props) => {
  const { onChange, label, className, value } = props;
  const { getCountries } = useCityStateCountry();
  const [selectedCountry, setSelectedCountry] = useState<DropdownOption | null>(
    null,
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    close: closeCountrySelect,
    isOpen: isCountrySelectOpen,
    open: openCountrySelect,
  } = useToggle();

  const { data: countriesData, isFetching: loadingCountries } = useQuery({
    queryKey: ["get-countries"],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const countriesOptions = useMemo<DropdownOption[]>(() => {
    return (
      countriesData?.map((item) => {
        const phoneCodeWithPlus = item.phonecode.startsWith("+")
          ? item.phonecode
          : `+${item.phonecode}`;
        return {
          label: `${item.emoji} ${phoneCodeWithPlus} ${item.name}`,
          value: phoneCodeWithPlus,
        };
      }) || []
    );
  }, [countriesData]);

  const updateParentValue = (
    country: DropdownOption | null,
    number: string,
  ) => {
    if (!country) return;

    const updatedValue = {
      label: country.label || "",
      value: `${country.value}:${number}`,
    };

    onChange(updatedValue);
  };

  const handleDropdownChange = (option: SingleValue<DropdownOption>) => {
    const newSelectedCountry = option as DropdownOption;
    setSelectedCountry(newSelectedCountry);
    updateParentValue(newSelectedCountry, phoneNumber);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    updateParentValue(selectedCountry, newPhoneNumber);
  };

  // Set initial value from props
  useEffect(() => {
    if (value && value.value.includes(":") && countriesOptions.length > 0) {
      const [code, number] = value.value.split(":");
      const country = countriesOptions.find((opt) => opt.value === code);

      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(number);
      }
    }
  }, [value, countriesOptions]);

  return (
    <div className={cn(className)}>
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <label className="text-secondary-700 text-sm font-normal">
            {label}
          </label>
        </div>
      )}
      <div className="flex w-full space-x-1 rounded-lg">
        <div className="w-36">
          {loadingCountries ? (
            <div className="fall h-full rounded-md border border-primary-200 bg-primary-100">
              <Spinner color="var(--neutral-400)" />
            </div>
          ) : (
            <CustomSelect
              options={countriesOptions}
              selectedOption={selectedCountry}
              onChange={(option) =>
                handleDropdownChange(option as SingleValue<DropdownOption>)
              }
              isSearchable={true}
              isMulti={false}
              loading={loadingCountries}
              onOpen={openCountrySelect}
              onClose={() => {
                closeCountrySelect();
              }}
              isOpen={isCountrySelectOpen && !loadingCountries}
              getOptionLabel={(e) => e.label}
              formatOptionLabel={(option, { context }) => {
                return context === "menu" ? (
                  <span>{option.label}</span>
                ) : (
                  <span>
                    {`${option?.label?.split(" ")[0]} ${option?.label?.split(" ")[1]}`}
                  </span>
                );
              }}
              noPlaceholder
              menuWidth={220}
              isPortal
            />
          )}
        </div>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
          fullWidth
        />
      </div>
    </div>
  );
};

export default PhoneInput;
