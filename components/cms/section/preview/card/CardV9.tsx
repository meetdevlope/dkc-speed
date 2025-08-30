import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV9: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title, description } = config;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-blue-light p-4",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <div className="shimmer-loading relative mb-3 h-20 w-full rounded-md">
        <ImageComponent
          src={imageUrl}
          alt={`${title}-alt`}
          fill
          className="rounded-md object-contain"
        />
      </div>
      <h6 className="mt-2 font-secondary font-medium text-primary-500 md:text-base">
        {" "}
        {title}{" "}
      </h6>
      <p className="text-neutral-400 md:text-sm"> {description} </p>
    </div>
  );
};

export default CardV9;
