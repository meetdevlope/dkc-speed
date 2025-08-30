import Checkbox from "components/Checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const CheckboxItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { label, hintText, fieldName } = config || {};

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Checkbox
      label={label}
      placeholder={hintText}
      {...register(fieldName)}
      error={Boolean(errors[fieldName]?.message)}
      helperText={errors[fieldName]?.message as string}
    />
  );
};

export default CheckboxItem;
