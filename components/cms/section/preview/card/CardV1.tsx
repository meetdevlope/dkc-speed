import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV1: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title } = config;

  return (
    <div
      className={cn(
        isWidthCard
          ? "w-36 min-w-36 md:w-48 md:min-w-48 lg:w-72 lg:min-w-72"
          : "w-full",
      )}
      aria-label={version}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <ImageComponent src={imageUrl || ""} alt={title + "-alt"} fill />
      </div>
      <h6 className="mt-2 truncate px-1 text-center font-secondary text-xs font-medium md:text-base">
        {title}
      </h6>
    </div>
  );
};

export default CardV1;
