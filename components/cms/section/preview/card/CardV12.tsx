import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV12: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { title, description } = config;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-blue-light p-4",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <h6 className="mt-1 font-secondary font-medium text-primary-500 md:text-base">
        {title}
      </h6>
      <p className="text-description mt-2 md:text-sm"> {description} </p>
    </div>
  );
};

export default CardV12;
