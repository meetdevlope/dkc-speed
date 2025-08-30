import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV3: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title } = config;

  return (
    <div
      className={cn(
        isWidthCard
          ? "w-36 min-w-36 md:w-48 md:min-w-48 lg:w-72 lg:min-w-72"
          : "w-full",
      )}
    >
      <div
        className="bg-off-white relative aspect-3/4 rounded-lg"
        aria-label={version}
      >
        <ImageComponent
          src={imageUrl}
          alt={title + "-alt"}
          fill
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h6 className="mt-2 text-center font-secondary font-medium md:text-base">
        {title}
      </h6>
    </div>
  );
};

export default CardV3;
