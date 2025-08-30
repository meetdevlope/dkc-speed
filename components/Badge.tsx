import React from "react";
import clsx from "clsx";

export interface BadgeProps {
  content: string | number;
  ariaLabel?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
  hideIfEmpty?: boolean;
  max?: number;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  content,
  ariaLabel,
  position = "top-right",
  className = "",
  max = 10,
  children,
}) => {
  if (!content || content === 0) return <>{children}</>;

  const displayContent =
    typeof content === "number" && max !== undefined && content > max
      ? `${max}+`
      : content;

  const positionClasses = clsx({
    "absolute top-1 right-0.5 translate-x-1/2 -translate-y-1/2":
      position === "top-right",
    "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2":
      position === "top-left",
    "absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2":
      position === "bottom-right",
    "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2":
      position === "bottom-left",
  });

  return (
    <div className="relative inline-block">
      {children}
      <span
        className={clsx(
          "-mt-1 inline-flex size-4 items-center justify-center rounded-full bg-red-500 text-xs font-normal text-white",
          positionClasses,
          className,
        )}
        aria-label={ariaLabel}
      >
        {displayContent}
      </span>
    </div>
  );
};

export default Badge;
