import { useQuery } from "@tanstack/react-query";
import { Input } from "components/Input";
import CustomSelect, { DropdownOption } from "components/Select";
import { useCityStateCountry } from "hooks/useCityStateCountry";
import { useToggle } from "hooks/useToggle";
import React, { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const AddressItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { addressConfig } = config || {};
  const { line1, line2, city, state, country, zip, hiddenElements, area } =
    addressConfig || {};

  const {
    formState: { errors },
    setValue,
    control,
    getValues,
    register,
  } = useFormContext();

  const [iso, setIso] = useState({
    countryIso: "",
    stateIso: "",
  });

  const {
    close: closeCountrySelect,
    isOpen: isCountrySelectOpen,
    open: openCountrySelect,
  } = useToggle();
  const {
    close: closeStateSelect,
    isOpen: isStateSelectOpen,
    open: openStateSelect,
  } = useToggle();
  const {
    close: closeCitySelect,
    isOpen: isCitySelectOpen,
    open: openCitySelect,
  } = useToggle();

  const { getCities, getCountries, getStates } = useCityStateCountry();

  const { data: countriesData, isFetching: loadingCountries } = useQuery({
    queryKey: ["get-countries"],
    queryFn: getCountries,
    // staleTime: 1000 * 60 * 60 * 60 * 24,
    enabled: isCountrySelectOpen,
  });
  const { data: statesData, isFetching: loadingStates } = useQuery({
    queryKey: ["get-states"],
    queryFn: () => getStates(iso.countryIso),
    // staleTime: 1000 * 60 * 60 * 60 * 24,
    enabled: isStateSelectOpen && Boolean(getValues("country")),
  });

  const { data: citiesData, isFetching: loadingCities } = useQuery({
    queryKey: ["get-cities"],
    queryFn: () => getCities(iso.countryIso, iso.stateIso),
    // staleTime: 1000 * 60 * 60 * 60 * 24,
    enabled:
      isCitySelectOpen &&
      Boolean(getValues("country")) &&
      Boolean(getValues("state")?.additional?.code),
  });

  const citiesOptions = useMemo<DropdownOption[]>(() => {
    if (citiesData && citiesData?.length > 0) {
      return citiesData?.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
        };
      });
    }
    return [];
  }, [citiesData]);
  const stateOptions = useMemo<DropdownOption[]>(() => {
    if (statesData) {
      return statesData?.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
          additional: {
            code: item.iso2,
          },
        };
      });
    }
    return [];
  }, [statesData]);
  const countriesOptions = useMemo<DropdownOption[]>(() => {
    if (countriesData) {
      return countriesData?.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
          additional: {
            code: item.iso2,
          },
        };
      });
    }
    return [];
  }, [countriesData]);

  return (
    <div className="grid max-h-[60vh] w-full grid-cols-1 gap-y-4 overflow-y-auto p-1 md:grid-cols-2 md:gap-4">
      {!hiddenElements?.line1 && (
        <Input
          type="text"
          {...register("line1")}
          label={line1?.label}
          placeholder={line1?.placeHolder}
          required={line1?.isRequired}
          // error={errors?.["line1"]?.message}
        />
      )}

      <Input
        type="text"
        {...register("line2")}
        placeholder={line2?.placeHolder}
        label={line2?.label}
        required={line2?.isRequired}
        // error={Boolean(errors?.["line2"])}
      />
      <Input
        type="text"
        {...register("area")}
        label={area?.label}
        placeholder={area?.placeHolder}
        required={area?.isRequired}
        // error={Boolean(errors?.area)}
      />
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, onBlur, value } }) => {
          const selectedCountry =
            typeof value === "object"
              ? {
                  label: (value as DropdownOption)?.label,
                  value: (value as DropdownOption)?.value,
                }
              : {
                  label: value,
                  value: value,
                };

          return (
            <CustomSelect
              options={countriesOptions}
              selectedOption={selectedCountry}
              onChange={onChange}
              label={country?.label || "Country"}
              onBlur={onBlur}
              isSearchable={true}
              isMulti={false}
              loading={loadingCountries}
              onOpen={openCountrySelect}
              isRequired={country?.isRequired}
              onClose={() => {
                setValue("state", {
                  label: "",
                  value: "",
                });
                setValue("city", {
                  label: "",
                  value: "",
                });
                setIso({
                  countryIso: getValues("country")?.additional?.code as string,
                  stateIso: "",
                });
                closeCountrySelect();
              }}
              isOpen={isCountrySelectOpen && !loadingCountries}
              error={errors.country}
              isPortal
            />
          );
        }}
      />

      <Controller
        control={control}
        name="state"
        render={({ field: { onChange, onBlur, value } }) => {
          const selectedState =
            typeof value === "object"
              ? {
                  label: (value as DropdownOption)?.label,
                  value: (value as DropdownOption)?.value,
                }
              : {
                  label: value,
                  value: value,
                };

          return (
            <CustomSelect
              options={stateOptions}
              selectedOption={selectedState}
              onChange={onChange}
              onBlur={onBlur}
              label={state?.label || "State"}
              isSearchable={true}
              isMulti={false}
              isRequired={state?.isRequired}
              loading={loadingStates}
              isOpen={isStateSelectOpen && !loadingStates}
              onOpen={openStateSelect}
              onClose={() => {
                setValue("city", {
                  label: "",
                  value: "",
                });
                setIso({
                  countryIso: getValues("country")?.additional?.code as string,
                  stateIso: getValues("state")?.additional?.code as string,
                });
                closeStateSelect();
              }}
              error={errors.state}
              isPortal
              noOptionsText={
                !getValues("country.value")
                  ? "Please select country"
                  : "No options"
              }
            />
          );
        }}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, onBlur, value } }) => {
          const selectedCity =
            typeof value === "object"
              ? {
                  label: (value as DropdownOption)?.label,
                  value: (value as DropdownOption)?.value,
                }
              : {
                  label: value,
                  value: value,
                };

          return (
            <CustomSelect
              options={citiesOptions}
              selectedOption={selectedCity}
              onChange={onChange}
              onBlur={onBlur}
              isRequired={city?.isRequired}
              label={city?.label || "City"}
              isSearchable={true}
              isMulti={false}
              loading={loadingCities}
              isOpen={isCitySelectOpen && !loadingCities}
              onOpen={openCitySelect}
              onClose={closeCitySelect}
              error={errors.city}
              isPortal
              noOptionsText={
                !getValues("state.value") ? "Please select state" : "No options"
              }
            />
          );
        }}
      />

      <Input
        type="number"
        label={zip?.label}
        placeholder={zip?.placeHolder}
        {...register("zip")}
        required={zip?.isRequired}
        // error={errors?.zipCode?.message}
      />
    </div>
  );
};

export default AddressItem;
