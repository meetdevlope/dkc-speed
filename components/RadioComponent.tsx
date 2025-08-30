import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "utils/helpers";

export type RadioButtonItem = {
  label: string;
  value: string;
  name: string;
};

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: FieldError | boolean | undefined;
  disabled?: boolean;
  radioClass?: string;
  radioButtonItems: RadioButtonItem[];
};

const RadioComponent = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error,
      disabled,
      radioClass,
      radioButtonItems,
      ...rest
    },
    ref,
  ) => {
    const isError = !!error;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={rest.id}
            className={`text-sm font-medium ${
              disabled ? "text-gray-400" : "text-description"
            }`}
          >
            {label}
          </label>
        )}
        <div className="flex items-center gap-8">
          {radioButtonItems?.length > 0 &&
            radioButtonItems?.map((item, index) => (
              <div className="flex items-center gap-3" key={index}>
                {item.label && (
                  <label
                    htmlFor={item.label}
                    className={`text-sm font-medium ${
                      disabled ? "text-gray-400" : "text-description"
                    }`}
                  >
                    {item.label}
                  </label>
                )}
                <input
                  ref={ref}
                  id={item.label}
                  value={item.value}
                  className={cn(
                    `cursor-pointer bg-transparent py-3 accent-primary1 outline-none ${
                      disabled
                        ? "cursor-not-allowed text-gray-400"
                        : "text-gray-700"
                    }`,
                    radioClass,
                  )}
                  autoComplete="off"
                  disabled={disabled}
                  type="radio"
                  {...rest}
                />
              </div>
            ))}
        </div>
        {helperText && (
          <span
            className={`ml-2 text-xs ${
              isError ? "text-red-500" : "text-gray-500"
            }`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

RadioComponent.displayName = "RadioComponent";

export default RadioComponent;
