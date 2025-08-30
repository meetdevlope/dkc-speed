import React from "react";
import { cn } from "utils/helpers";

type DividerProps = {
  color?: string;
  className?: string;
  isBlueDivider?: boolean;
};

const Divider: React.FC<DividerProps> = (props) => {
  const { className, isBlueDivider } = props;

  if (isBlueDivider)
    return (
      <hr
        className={`h-1 w-full border-none bg-blue-light outline-none ${className}`}
      />
    );

  return (
    <hr
      className={cn(
        `h-[1px] w-full border-none bg-neutral-100 outline-none`,
        className,
      )}
    />
  );
};

export default Divider;
