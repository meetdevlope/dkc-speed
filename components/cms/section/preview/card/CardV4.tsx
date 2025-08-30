import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV4: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title } = config;

  return (
    <div aria-label={version}>
      <div
        className={cn(
          "bg-off-white relative aspect-square w-full",
          isWidthCard ? "min-w-64" : "w-full",
        )}
      >
        <ImageComponent
          src={imageUrl}
          alt={title + "-alt"}
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <h6 className="mt-2 text-center font-secondary font-medium text-white md:text-base">
        {title}
      </h6>
    </div>
  );
};

export default CardV4;
