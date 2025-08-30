// Icon.tsx - The reusable Icon component with stroke support
import React from "react";
import { IconName, ICONS } from "./Icons";

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: (e?: any) => void;
  hoverColor?: string;
  // New prop to identify icon type with fill as default
  iconType?: "fill" | "stroke";
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  onClick,
  hoverColor,
  // Default to "fill" instead of auto-detection
  iconType = "fill",
}) => {
  const icon = ICONS[name];

  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const sizeValue = typeof size === "number" ? `${size}px` : size;

  // Check if this is a stroke icon based on the iconType prop
  const isStrokeIcon = iconType === "stroke";

  // Create dynamic styles for hover effects
  const hoverStyles = hoverColor
    ? {
        [isStrokeIcon ? "--hover-stroke" : "--hover-fill"]: hoverColor,
      }
    : {};

  // Create CSS classes for hover effects
  const hoverClass = hoverColor
    ? isStrokeIcon
      ? "hover:[stroke:var(--hover-stroke)]"
      : "hover:[fill:var(--hover-fill)]"
    : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox={icon.viewBox}
      // For stroke icons, set fill to none and stroke to color
      // For fill icons, set fill to color
      fill={isStrokeIcon ? "none" : color}
      stroke={isStrokeIcon ? color : "none"}
      className={`transition-colors duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${hoverClass} ${className}`}
      onClick={onClick}
      style={{ ...hoverStyles }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

export default Icon;
