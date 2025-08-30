// components/Dialog.tsx
import React, { ReactNode, useEffect, useRef } from "react";
import { cn } from "utils/helpers";
import { Button, ButtonProps } from "./Button";
import Icon from "./icon/Icon";

interface DialogAction {
  primary?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    fullWidth?: boolean;
    loading?: boolean;
    className?: string;
    size?: ButtonProps["size"];
  };
  secondary?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    fullWidth?: boolean;
    loading?: boolean;
    className?: string;
    size?: ButtonProps["size"];
  };
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactNode;
  trailingHeaderComponent?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  noClose?: boolean;
  actions?: DialogAction;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Dialog: React.FC<DialogProps> = (props) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    actions,
    noClose,
    size = "md",
    trailingHeaderComponent,
  } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px]"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Dialog Content */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          `animate-pop-in relative mx-4 w-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300`,
          {
            "max-w-sm": size === "sm",
            "max-w-2xl": size === "md",
            "max-w-4xl": size === "lg",
            "max-w-7xl": size === "xl",
            "w-full": size === "full",
          },
        )}
      >
        {/* Header */}
        <div className="border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <h5
              id="dialog-title"
              className="text-base font-medium text-gray-800 md:text-xl"
            >
              {title}
            </h5>
            {trailingHeaderComponent && (
              <div className="mr-2 ml-auto">{trailingHeaderComponent}</div>
            )}
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 transition hover:text-gray-600"
              aria-label="Close dialog"
            >
              <Icon name="close" iconType="stroke" className="stroke-[1.2px]" />
            </button>
          </div>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-4 py-1 text-gray-700 md:px-6 md:py-4">
          {children}
        </div>

        {/* Footer Actions */}
        {(actions || !noClose) && (
          <div className="flex justify-end gap-2 border-t border-gray-200 py-4 pr-4">
            {!noClose && (
              <Button
                onClick={onClose}
                variant="outline"
                size={actions?.primary?.size || "md"}
              >
                Close
              </Button>
            )}
            {actions?.secondary && (
              <Button
                disabled={actions?.secondary?.disabled}
                onClick={actions?.secondary?.onClick}
                startIcon={actions?.secondary?.startIcon}
                endIcon={actions?.secondary?.endIcon}
                size={actions?.secondary?.size}
                variant="outline"
                className={actions.secondary.className}
                isLoading={actions?.secondary?.loading}
              >
                {actions?.secondary?.label}
              </Button>
            )}
            {actions?.primary && (
              <Button
                disabled={actions?.primary?.disabled}
                onClick={actions?.primary?.onClick}
                startIcon={actions?.primary?.startIcon}
                size={actions?.primary?.size}
                endIcon={actions?.primary?.endIcon}
                className={actions?.primary?.className}
                isLoading={actions?.primary?.loading}
              >
                {actions?.primary?.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
