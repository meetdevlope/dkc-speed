"use client";

import { cn } from "utils/helpers";
import React, { ReactNode } from "react";

type IconButtonProps = {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16;
  color?: string;
  children: ReactNode;
  onClick?: () => void;
  parentClassName?: string;
};

const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    children,
    color = "white",
    size = 6,
    onClick,
    parentClassName,
  } = props;

  return (
    <span
      className={cn(
        "fall cursor-pointer rounded-full p-1.5 hover:bg-white/40",
        parentClassName,
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "fall",
          size === 1 && "size-1",
          size === 2 && "size-2",
          size === 3 && "size-3",
          size === 4 && "size-4",
          size === 5 && "size-5",
          size === 6 && "size-6",
          size === 7 && "size-7",
          size === 8 && "size-8",
          size === 9 && "size-9",
          size === 10 && "size-10",
          size === 11 && "size-11",
          size === 12 && "size-12",
          size === 14 && "size-14",
          size === 16 && "size-16",
        )}
        style={{
          color: `rgba(var(--${color}))`,
        }}
      >
        {children}
      </span>
    </span>
  );
};

export default IconButton;
