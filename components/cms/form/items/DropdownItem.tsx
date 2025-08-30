import CustomSelect, { DropdownOption } from "components/Select";
import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const DropdownItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { label, menuItems, fieldName, isRequired } = config || {};

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const options = useMemo<DropdownOption[]>(() => {
    if (menuItems) {
      return menuItems?.map((item) => {
        return {
          label: item?.label,
          value: item?.value,
        };
      });
    }
    return [];
  }, [menuItems]);

  const labelNew = isRequired ? `${label} *` : label;
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <CustomSelect
            options={options}
            onBlur={onBlur}
            selectedOption={value}
            onChange={onChange}
            label={labelNew}
            isSearchable={true}
            isMulti={false}
            error={Boolean(errors[fieldName]?.message)}
            helperText={errors[fieldName]?.message as string}
          />
        );
      }}
    />
  );
};

export default DropdownItem;
