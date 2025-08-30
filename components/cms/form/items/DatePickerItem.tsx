import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker, { DatePickerProps } from "components/datepicker/DatePicker";
import { FormItemProps } from "types/cms/form/formTypes";

interface DatePickerItemProps extends FormItemProps {
  mode: DatePickerProps["mode"];
}

const DatePickerItem: React.FC<DatePickerItemProps> = (props) => {
  const { config, mode } = props;
  const { label, hintText, fieldName, isRequired } = config || {};

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[fieldName]?.message as string;

  return (
    <div className="mb-4">
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: isRequired ? "This field is required" : false }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label={label}
            selected={value}
            onChange={onChange}
            mode={mode || "date"}
          />
        )}
      />
      {hintText && <p className="text-xs text-gray-500">{hintText}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default DatePickerItem;
