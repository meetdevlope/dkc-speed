import RadioComponent, { RadioButtonItem } from "components/RadioComponent";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const RadioItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { label, fieldName, radioBtnItems } = config || {};

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const data: RadioButtonItem[] =
    radioBtnItems?.map((e) => ({
      label: e.label,
      name: fieldName,
      value: e.value,
    })) || [];

  return (
    <RadioComponent
      label={label}
      radioButtonItems={data || []}
      {...register(fieldName)}
      error={Boolean(errors[fieldName]?.message)}
      helperText={errors[fieldName]?.message as string}
    />
  );
};

export default RadioItem;
