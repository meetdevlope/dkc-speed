import Link from "next/link";
import React from "react";
import { cn } from "utils/helpers";
import { ROUTES } from "utils/routes";
import FullName from "./variants/FullName";

type LogoProps = {
  className?: string;
  noNavigation?: boolean;
  mode?: "dark" | "light";
};

const Logo: React.FC<LogoProps> = (props) => {
  const { className, noNavigation, mode = "light" } = props;

  return noNavigation ? (
    <LogoSVG className={className} mode={mode} />
  ) : (
    <Link href={ROUTES.SHOP}>
      <LogoSVG className={className} mode={mode} />
    </Link>
  );
};

const LogoSVG = ({
  className,
  mode,
}: {
  className: string | undefined;
  mode: "dark" | "light";
}) => (
  <div className={cn(`fall size-14`, className)}>
    <FullName mode={mode} />
  </div>
);

export default Logo;
