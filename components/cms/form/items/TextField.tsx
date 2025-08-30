import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormItemProps } from "types/cms/form/formTypes";

const TextField: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const {
    label,
    hintText,
    type,
    fieldName,
    isRequired,
    isSubmitInSuffix,
    isPrimaryColor,
    requiredErrorText,
  } = config || {};

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      label={label}
      fullWidth
      type={type}
      required={isRequired}
      placeholder={hintText}
      {...register(fieldName)}
      error={
        errors[fieldName]
          ? requiredErrorText || String(errors[fieldName]?.message)
          : undefined
      }
      rightElement={
        isSubmitInSuffix ? (
          <button
            className="h-full w-full px-3"
            type="submit"
            style={
              isPrimaryColor
                ? {
                    backgroundColor: "var(--primary-500)",
                  }
                : {}
            }
          >
            <Icon
              name="chevron"
              iconType="stroke"
              className="-rotate-90"
              size={18}
              color="white"
            />
          </button>
        ) : null
      }
    />
  );
};

export default TextField;
