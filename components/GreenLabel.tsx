import React, { ReactNode } from "react";
import { cn } from "utils/helpers";

type GreenLabelProps = {
  children: ReactNode;
  className?: string;
};

const GreenLabel: React.FC<GreenLabelProps> = (props) => {
  const { className, children } = props;

  return (
    <div
      className={cn(
        "mx-auto inline-flex bg-primary-500 px-0.5 [&>*]:text-white",
        className,
      )}
    >
      <span className="text-xs">{children}</span>
    </div>
  );
};

export default GreenLabel;
