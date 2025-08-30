import React, { useEffect, useState } from "react";

type Size = "sm" | "md" | "lg";

export type ToggleButtonType = {
  key: string;
  value: string;
};

interface ToggleProps {
  options: ToggleButtonType[];
  initialSelected?: string;
  onSelectionChange?: (selected: any) => void;
  additionalOnChange?: (selected: any) => void;
  className?: string;
  size?: Size;
}

const ToggleButton: React.FC<ToggleProps> = ({
  options = [],
  initialSelected,
  onSelectionChange,
  className = "",
  size = "md",
  additionalOnChange,
}) => {
  const safeOptions =
    Array.isArray(options) && options.length > 0 ? options : [];

  const safeInitialSelected =
    initialSelected && safeOptions.find((e) => e.key === initialSelected)
      ? initialSelected
      : safeOptions[0].key;

  const [selected, setSelected] = useState(safeInitialSelected);

  useEffect(() => {
    if (initialSelected && safeOptions.some((e) => e.key === initialSelected)) {
      setSelected(initialSelected);
    }
  }, [initialSelected, options]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelectionChange?.(option);
    if (additionalOnChange) {
      additionalOnChange(option);
    }
  };

  const sizeStyles = {
    sm: {
      button: "px-2 py-1 text-sm",
      container: "p-1",
    },
    md: {
      button: "px-2.5 py-2 text-sm",
      container: "gap-x-2 p-1",
    },
    lg: {
      button: "px-3 py-2 text-base",
      container: "gap-x-2 p-1.5",
    },
  };

  const containerClasses = sizeStyles[size].container;
  const buttonClasses = sizeStyles[size].button;

  return (
    <div
      className={`border-secondary-100 relative inline-flex rounded-lg border border-neutral-100 bg-white ${containerClasses} ${className}`}
    >
      {safeOptions.map((option) => (
        <button
          key={option.key}
          onClick={() => handleSelect(option.key)}
          type="button"
          className={` ${buttonClasses} relative z-10 w-full cursor-pointer rounded-md text-nowrap capitalize transition-all duration-150 ${
            selected === option.key
              ? "rounded-md bg-primary-200 font-medium text-primary-500"
              : "hover:bg-disable-200/60 text-gray-500"
          } `}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
