import TextArea from "components/TextArea";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const TextAreaItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;

  const { label, hintText, fieldName, lines } = config || {};

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextArea
      label={label}
      placeholder={hintText}
      rows={lines}
      {...register(fieldName)}
      error={Boolean(errors[fieldName]?.message)}
      helperText={errors[fieldName]?.message as string}
    />
  );
};

export default TextAreaItem;
