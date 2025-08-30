import React, { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "utils/helpers";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: FieldError | boolean | undefined;
  disabled?: boolean;
  checkboxClass?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, disabled, checkboxClass, ...rest }, ref) => {
    const isError = !!error;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <input
            ref={ref}
            className={cn(
              `cursor-pointer bg-transparent py-3 accent-neutral-500 outline-none ${
                disabled ? "cursor-not-allowed text-gray-400" : "text-gray-700"
              }`,
              checkboxClass,
            )}
            autoComplete="off"
            disabled={disabled}
            type="checkbox"
            {...rest}
          />
          {label && (
            <label
              htmlFor={rest.id}
              className={`text-sm font-medium ${
                disabled ? "text-gray-400" : "text-primary1"
              } ${rest.id ? "cursor-pointer" : ""} `}
            >
              {label}
            </label>
          )}
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

Checkbox.displayName = "CheckboxComponent";

export default Checkbox;
