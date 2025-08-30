import React, { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "utils/helpers";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: FieldError | boolean | undefined;
  disabled?: boolean;
  textAreaClass?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, helperText, error, disabled, textAreaClass, ...rest }, ref) => {
    const isError = !!error;

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={rest.id}
            className={`text-sm ${
              disabled ? "text-gray-400" : "text-secondary-700"
            }`}
          >
            {label}
          </label>
        )}
        <div
          className={`flex items-center gap-2 rounded-sm border border-primary-200 px-3 transition-all ${
            isError
              ? "border-red-500 focus-within:border-red-500"
              : "border-secondary focus-within:border-primary2"
          } ${
            disabled ? "cursor-not-allowed border-gray-200 bg-neutral-50" : ""
          }`}
        >
          <textarea
            ref={ref}
            className={cn(
              `flex-1 bg-transparent py-3 text-sm outline-none ${
                disabled ? "cursor-not-allowed text-gray-400" : "text-gray-700"
              }`,
              textAreaClass,
            )}
            autoComplete="off"
            disabled={disabled}
            {...rest}
          />
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

TextArea.displayName = "TextAreaComponent";

export default TextArea;
