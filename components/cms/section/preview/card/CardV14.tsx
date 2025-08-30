import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV14: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { title, description, imageUrl } = config;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-md bg-white",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <div className="shimmer-loading relative aspect-[20/9] w-full rounded-md">
        <ImageComponent
          src={imageUrl}
          alt={`${title}-alt`}
          fill
          className="rounded-md"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-1 font-secondary font-medium text-primary-500 md:text-base">
          {title}
        </h6>
        <p className="text-gray-500 md:text-sm"> {description} </p>
      </div>
    </div>
  );
};

export default CardV14;
