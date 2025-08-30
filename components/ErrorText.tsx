import React, { ReactNode } from "react";
import { cn } from "utils/helpers";

type ErrorTextProps = {
  children: ReactNode;
  className?: string;
};

const ErrorText: React.FC<ErrorTextProps> = (props) => {
  const { children, className } = props;

  return <h6 className={cn(`text-red-600`, className)}>{children}</h6>;
};

export default ErrorText;
