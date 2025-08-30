import { cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "utils/helpers";
import Spinner from "./spinner/Spinner";

// Define the button variants using class-variance-authority

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "transparent"
  | "text"
  | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  startIconContainerClassName?: string;
  endIconContainerClassName?: string;
}

const buttonVariants = cva(
  "inline-flex items-center text-nowrap justify-center cursor-pointer rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500",
        secondary:
          "bg-neutral-500 text-neutral-100 hover:bg-neutral-500/85 focus-visible:ring-secondary-200",
        outline:
          "border border-secondary-500 bg-transparent hover:bg-neutral-50 focus-visible:ring-secondary-100",
        ghost:
          "bg-transparent hover:bg-primary-100 focus-visible:ring-primary-100",
        link: "bg-transparent text-primary-500 hover:underline p-0 h-auto",
        transparent:
          "bg-transparent text-primary-500 hover:bg-secondary-100/50 p-0 h-auto",
        danger:
          "bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-500",
        text: "text-neutral-900",
      },
      size: {
        sm: "text-xs px-2.5 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-3 ",
        xl: "text-lg px-6 py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

/**
 * Button component with support for variants, sizes, icons, loading state, etc.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      startIcon,
      endIcon,
      isLoading = false,
      disabled = false,
      fullWidth = false,
      onClick,
      type = "button",
      startIconContainerClassName = "",
      endIconContainerClassName = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth ? "w-full" : "",
          className,
        )}
        disabled={disabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {startIcon && (
          <span className={cn("mr-2", startIconContainerClassName)}>
            {startIcon}
          </span>
        )}
        {children}
        {isLoading && <Spinner className="ml-2" />}
        {endIcon && (
          <span className={(cn("ml-2"), endIconContainerClassName)}>
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
