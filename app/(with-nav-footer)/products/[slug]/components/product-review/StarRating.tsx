"use client";

import React, { useState, useEffect, useRef } from "react";

interface StarRatingProps {
  name?: string;
  value?: number;
  precision?: 0.5 | 1;
  size?: "small" | "medium" | "large";
  showSingleDigit?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent, value: number | null) => void;
  onChangeActive?: (event: React.SyntheticEvent, value: number) => void;
  emptyIcon?: React.ReactNode;
  icon?: React.ReactNode;
  max?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  name = "rating",
  value: controlledValue,
  precision = 1,
  size = "medium",
  readOnly = false,
  disabled = false,
  showSingleDigit = false,
  onChange,
  onChangeActive,
  //   emptyIcon,
  //   icon,
  max = 5,
}) => {
  const [value, setValue] = useState<number | null>(controlledValue || null);
  const [hover, setHover] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (readOnly || disabled) return;

    const rootRect = rootRef.current?.getBoundingClientRect();
    if (!rootRect) return;

    const starWidth = rootRect.width / max;
    const offset = event.clientX - rootRect.left;

    let newHover = Math.floor(offset / starWidth) + 1;

    if (precision === 0.5) {
      const fraction = (offset % starWidth) / starWidth;
      if (fraction < 0.5) {
        newHover -= 0.5;
      }
    }

    newHover = Math.max(0, Math.min(newHover, max));

    if (hover !== newHover) {
      setHover(newHover);
      if (onChangeActive) {
        onChangeActive(event, newHover);
      }
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (readOnly || disabled) return;

    setHover(-1);
    if (onChangeActive) {
      onChangeActive(event, -1);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (readOnly || disabled) return;

    const newValue = hover !== -1 ? hover : value;

    setValue(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  if (showSingleDigit) {
    return (
      <div className="inline-flex items-center gap-1 rounded-sm bg-amber-500 px-1.5">
        <p className="mt-1 text-[13px] font-medium text-white">{value}</p>
        <FilledStar className="size-3 text-white" />
      </div>
    );
  }

  const getIconClassName = (index: number) => {
    const baseSize =
      size === "small" ? "w-4 h-4" : size === "large" ? "w-8 h-8" : "w-6 h-6";
    const baseTransition = "transition-transform duration-300";
    const hoverEffect =
      !readOnly && !disabled && hover >= index ? "scale-110" : "";
    const baseColor = disabled ? "text-gray-400" : "text-amber-500";

    return `${baseSize} ${baseTransition} ${hoverEffect} ${baseColor}`;
  };

  const renderStar = (index: number) => {
    const itemValue = index + 1;
    const showFilled =
      hover !== -1 ? hover >= itemValue : value !== null && value >= itemValue;
    const showHalf =
      precision === 0.5 &&
      value !== null &&
      Math.abs(value - index - 0.5) < 0.001;

    return (
      <span
        key={index}
        className={`relative inline-block cursor-pointer ${disabled ? "cursor-not-allowed" : readOnly ? "cursor-not-allowed" : "cursor-pointer"}`}
        data-value={itemValue}
        onClick={handleClick}
      >
        {showFilled ? (
          <FilledStar className={getIconClassName(itemValue)} />
        ) : showHalf ? (
          <div className="relative">
            <EmptyStar className={getIconClassName(itemValue)} />
            <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
              <FilledStar className={getIconClassName(itemValue)} />
            </div>
          </div>
        ) : (
          <EmptyStar className={getIconClassName(itemValue)} />
        )}
      </span>
    );
  };

  return (
    <div
      ref={rootRef}
      className={`inline-flex items-center ${disabled ? "opacity-60" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label={name}
    >
      {Array.from({ length: max }).map((_, index) => renderStar(index))}
    </div>
  );
};

// SVG icons with the same appearance as MUI's star icons
export const FilledStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
  </svg>
);

const EmptyStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path>
  </svg>
);

export default StarRating;
