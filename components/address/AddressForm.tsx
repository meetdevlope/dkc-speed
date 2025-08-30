"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AddressAutocomplete, {
  AddressAutocompleteProps,
} from "app/(with-nav-footer)/account/(with-max-width)/personal-details/components/AddressAutocomplete";
import { ButtonProps } from "components/Button";
import CountryDropdown from "components/CountryDropdown";
import { Input } from "components/Input";
import { DropdownOption } from "components/Select";
import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "store/auth";
import { z } from "zod";

const dropdownOptionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

const addressInputSchema = z.object({
  personName: z.string().min(1, "Name is required"),
  line1: z.string().min(1, "Line 1 is required"),
  line2: z.string().optional(),
  area: z.string().min(1, "Area is required"),
  zipCode: z.string().min(1, "Postal code is required"),
  country: dropdownOptionSchema,
  countryCode: z.string().optional(),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  isDefault: z.boolean().optional(),
});

export type AddressInputTypes = z.infer<typeof addressInputSchema>;

type AddressFormProps = {
  initialValues?: AddressInputTypes;
  onFormSubmit?: (data: AddressInputTypes) => void;
  showClearForm?: boolean;
  showSearchAddress?: boolean;
  hideCountry?: boolean;
  submitConfig?: {
    text?: string;
    size?: ButtonProps["size"];
    className?: string;
  };
} & Pick<AddressAutocompleteProps, "useGeoBounding" | "disableCountryRestrict">;

export type AddressFormHandle = {
  clearForm: () => void;
  submitForm: () => Promise<AddressInputTypes | undefined>; // Add a submission method
};

const AddressForm = forwardRef<AddressFormHandle, AddressFormProps>(
  (props, ref) => {
    const {
      initialValues,
      onFormSubmit,
      showSearchAddress = true,
      useGeoBounding,
      hideCountry = false,
    } = props;

    useImperativeHandle(ref, () => ({
      clearForm,
      submitForm: async () => {
        const isValid = await trigger();
        if (isValid) {
          const formData = getValues();
          return {
            ...formData,
            countryCode: user?.countryCode,
          };
        }
        return undefined;
      },
    }));

    const user = useAuthStore((state) => state.user.user);

    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      control,
      trigger,
      reset: resetFormValues,
      formState: { errors },
    } = useForm<AddressInputTypes>({
      resolver: zodResolver(addressInputSchema),
      defaultValues: {
        country: initialValues?.country,
        countryCode: user?.countryCode,
      },
    });

    const onSubmit: SubmitHandler<AddressInputTypes> = async (data) => {
      if (onFormSubmit) {
        onFormSubmit({
          ...data,
          countryCode: user?.countryCode,
        });
      }
    };

    const clearForm = useCallback(() => {
      resetFormValues({
        personName: "",
        line1: "",
        line2: "",
        area: "",
        zipCode: "",
        state: "",
        city: "",
        isDefault: false,
        country: {
          label: "",
          value: "",
        },
      });
    }, [resetFormValues]);

    const setFormValues = useCallback(
      (newValues) => {
        if (newValues) {
          Object.keys(newValues).forEach((key) => {
            setValue(key as keyof AddressInputTypes, newValues[key]);
          });
        }
      },
      [setValue],
    );

    useEffect(() => {
      if (initialValues) {
        setFormValues(initialValues);
      }
    }, [initialValues, setFormValues]);

    const getAddressMatch = (components, types, key = "long_name") => {
      if (!components || !Array.isArray(components)) return null;

      for (const type of types) {
        const match = components.find((comp) => comp.types.includes(type));
        if (match && match[key]) {
          return match[key];
        }
      }

      return null;
    };

    // const buildAddressLine1 = useCallback((components, typesArray) => {
    //   const parts = typesArray.map((types) =>
    //     getAddressMatch(components, types),
    //   );
    //   return parts.filter(Boolean).join(", ");
    // }, []);

    useEffect(() => {
      if (user?.firstName || user?.lastName) {
        const personName =
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
        setValue("personName", personName);
      }
    }, [setValue, user?.firstName, user?.lastName]);

    const handleOnPlaceChange = useCallback(
      (placeData: google.maps.GeocoderAddressComponent[]) => {
        resetFormValues({
          area: "",
          state: "",
          city: "",
          zipCode: "",
          line1: "",
          line2: "",
          isDefault: false,
          country: initialValues?.country,
        });
        if (placeData) {
          const state = getAddressMatch(placeData, [
            "administrative_area_level_1",
          ]);
          const city = getAddressMatch(placeData, [
            "administrative_area_level_3",
            "postal_town",
          ]);
          const area = getAddressMatch(placeData, [
            "sublocality",
            "locality",
            "political",
          ]);
          const zipCode = getAddressMatch(placeData, ["postal_code"]);
          const line1 = getAddressMatch(placeData, ["premise"]);
          const line2 = getAddressMatch(placeData, ["route", "street_number"]);

          if (line1) {
            setValue("line1", line1);
          }
          if (line2) {
            setValue("line2", line2);
          }
          // if (country) {
          //   setValue("country", country);
          // }
          if (state) {
            setValue("state", state);
          }
          if (city) {
            setValue("city", city);
          }
          if (area) {
            setValue("area", area);
          }
          if (zipCode) {
            setValue("zipCode", zipCode);
          }
        }
      },
      [initialValues?.country, resetFormValues, setValue],
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="pb-2">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 p-1 md:gap-4">
          {!hideCountry && (
            <div className="col-span-2 flex">
              <Controller
                name="country"
                control={control}
                render={({ field: { value, onChange } }) => {
                  const selectedOption =
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
                    <CountryDropdown
                      onChange={onChange}
                      selectedOption={selectedOption}
                      error={errors.country?.message}
                    />
                  );
                }}
              />
            </div>
          )}
          {showSearchAddress && (
            <div className="col-span-2">
              <AddressAutocomplete
                onPlaceSelect={handleOnPlaceChange}
                label="Search Address"
                useGeoBounding={useGeoBounding}
              />
            </div>
          )}
          <Input
            type="text"
            {...register("personName")}
            label="Name"
            error={errors.personName?.message}
          />
          <Input
            type="text"
            {...register("line1")}
            label="House / Apartment"
            error={errors.line1?.message}
          />
          <Input
            type="text"
            {...register("line2")}
            label="Street (optional)"
            error={errors.line2?.message}
          />

          <Input
            type="text"
            {...register("area")}
            label="Area"
            error={errors.area?.message}
          />
          {/* <Input
            type="text"
            {...register("country")}
            label="Country"
            error={errors.country?.message}
          /> */}
          <Input
            type="text"
            {...register("state")}
            label="State"
            error={errors.state?.message}
          />
          <Input
            type="text"
            {...register("city")}
            label="City"
            error={errors.city?.message}
          />

          <Input
            type="text"
            label="Postal code"
            {...register("zipCode")}
            error={errors.zipCode?.message}
          />
        </div>
      </form>
    );
  },
);

AddressForm.displayName = "SavedAddressForm";

export default AddressForm;
