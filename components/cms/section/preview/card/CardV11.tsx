import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV11: React.FC<AppCardProps> = (props) => {
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
      <div className="shimmer-loading relative mb-3 size-16 shrink-0 rounded-full">
        <ImageComponent
          src={imageUrl}
          alt={`${title}-alt`}
          fill
          className="rounded-full"
        />
      </div>
      <h6 className="mt-1 font-secondary font-medium text-primary-500 md:text-base">
        {title}
      </h6>
      <p className="text-description mt-2 md:text-sm"> {description} </p>
    </div>
  );
};

export default CardV11;
