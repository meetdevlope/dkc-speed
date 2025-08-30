import React, { ReactNode } from "react";
import { cn } from "utils/helpers";

type MaxWidthWrapperProps = {
  children: ReactNode;
  className?: string;
};

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = (props) => {
  const { className, children } = props;

  return <div className={cn("mx-auto max-w-8xl", className)}> {children} </div>;
};

export default MaxWidthWrapper;
