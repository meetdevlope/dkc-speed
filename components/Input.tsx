"use client";

import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "utils/helpers";
import Icon from "./icon/Icon";

// Create a type that omits the conflicting properties
type InputHTMLAttributesWithoutConflicts = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "className"
>;

export interface InputProps extends InputHTMLAttributesWithoutConflicts {
  /** Label for the input field */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Right aligned action element like a button or icon */
  rightElement?: React.ReactNode;
  /** Left aligned element like an icon */
  leftElement?: React.ReactNode;
  /** Whether the input is required */
  required?: boolean;
  /** Input variants */
  variant?: "outlined" | "filled" | "transparent";
  /** Input sizes */
  inputSize?: "sm" | "md" | "lg";
  /** If input type is password, toggle password visibility */
  togglePassword?: boolean;
  fullWidth?: boolean;
  /** Container class name */
  containerClassName?: string;
  /** Input class name */
  className?: string;
  /** Additional props for form libraries like React Hook Form */

  formProps?: any;
}

export type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      helperText,
      error,
      rightElement,
      leftElement,
      required = false,
      fullWidth = false,
      variant = "filled",
      inputSize = "md",
      type = "text",
      disabled = false,
      togglePassword = false,
      formProps,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    const sizeClasses = {
      sm: "text-xs py-1.5 px-2.5",
      md: "text-sm py-1.5 md:py-2 px-3",
      lg: "text-sm py-2.5 md:py-3 px-3",
    };

    const variantClasses = {
      outlined: `bg-transparent border border-secondary-100 hover:border-secondary-200/80`,
      filled:
        "bg-primary-100 border border-primary-200 focus-within:border-primary-400 hover:border-primary-300",
      transparent:
        "bg-transparent hover:border-secondary-200/80 focus:border-primary-500",
    };

    const disableClasses =
      "disabled:bg-secondary-500 disabled:text-secondary-400 disabled:cursor-not-allowed";

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div
        className={cn("space-y-1", fullWidth && "w-full", containerClassName)}
      >
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={props.id || props.name}
              className="text-secondary-700 text-sm font-normal"
            >
              {label}
              {required && <span className="ml-0.5 text-gray-400">*</span>}
            </label>
          </div>
        )}

        <div
          className={cn(
            "flex overflow-hidden rounded-md transition-all",
            error ? "border border-danger-500" : variantClasses[variant],
          )}
        >
          {leftElement && (
            <div className="fall bg-secondary-100/40 pointer-events-none aspect-square size-10 min-w-10">
              {leftElement}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full bg-transparent transition-colors outline-none",
              "placeholder:text-secondary-400",
              disableClasses,
              fullWidth && "w-full",
              sizeClasses[inputSize],
              leftElement && "pl-3",
              rightElement || (togglePassword && type === "password")
                ? "pr-3"
                : "",
              className,
            )}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            autoComplete="new-password"
            {...props}
            {...formProps}
          />

          {(rightElement || (togglePassword && type === "password")) && (
            <div className={"fall"}>
              {togglePassword && type === "password" ? (
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="text-secondary-400 hover:text-secondary-600 cursor-pointer focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <Icon name="eye-off" size={20} />
                  ) : (
                    <Icon name="eye" size={20} />
                  )}
                </button>
              ) : (
                rightElement
              )}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              "!text-[13px]",
              error ? "text-danger-500" : "text-neutral-400",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
