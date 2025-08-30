import React from "react";
import { cn } from "utils/helpers";

type InitialsProps = {
  name: string;
  className?: string;
};

const Initials: React.FC<InitialsProps> = (props) => {
  const { name, className } = props;

  if (!name) return null;

  return (
    <div
      className={cn(
        "fall size-6 min-w-6 rounded-full bg-neutral-500/85 text-sm text-white",
        className,
      )}
    >
      {name?.[0] || "-"}
    </div>
  );
};

export default Initials;
