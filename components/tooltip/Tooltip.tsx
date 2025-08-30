"use client";

import React from "react";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  maxWidth?: number;
  offset?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  disabled = false,
  className = "",
  contentClassName = "",
  arrow = true,
  maxWidth = 250,
  offset = 8,
}) => {
  if (!content) {
    return <div>{children}</div>;
  }

  if (disabled) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const getPositionClasses = (): string => {
    switch (position) {
      case "top":
        return `bottom-full left-1/2 -translate-x-1/2 mb-${offset / 2}`;
      case "right":
        return `left-full top-1/2 -translate-y-1/2 ml-${offset / 2}`;
      case "bottom":
        return `top-full left-1/2 -translate-x-1/2 mt-${offset / 2}`;
      case "left":
        return `right-full top-1/2 -translate-y-1/2 mr-${offset / 2}`;
      default:
        return `bottom-full left-1/2 -translate-x-1/2 mb-${offset / 2}`;
    }
  };

  const getArrowClasses = (): string => {
    switch (position) {
      case "top":
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45";
      case "right":
        return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
      case "bottom":
        return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45";
      case "left":
        return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45";
      default:
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-full rotate-45";
    }
  };

  const baseTooltipClasses =
    "absolute z-50 px-2 py-1 text-sm truncate rounded shadow-md text-nowrap bg-neutral-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none";
  const baseArrowClasses = "absolute w-2 h-2 bg-neutral-500";

  return (
    <div className={`group relative inline-block ${className}`}>
      <div className="inline-flex">{children}</div>

      <div
        role="tooltip"
        style={{ maxWidth: `${maxWidth}px` }}
        className={`${baseTooltipClasses} ${getPositionClasses()} ${contentClassName}`}
      >
        {content}
        {arrow && (
          <span className={`${baseArrowClasses} ${getArrowClasses()}`} />
        )}
      </div>
    </div>
  );
};

export default Tooltip;
