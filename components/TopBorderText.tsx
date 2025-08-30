import Link from "next/link";
import React, { ReactNode } from "react";
import { cn } from "utils/helpers";

type TopBorderTextProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const TopBorderText: React.FC<TopBorderTextProps> = (props) => {
  const { href = "#", className, children } = props;

  return (
    <Link
      href={href}
      className={cn(
        "border-t border-primary-500 pt-1 text-xs font-medium text-primary-500 md:text-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default TopBorderText;
