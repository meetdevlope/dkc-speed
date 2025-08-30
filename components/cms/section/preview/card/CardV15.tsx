import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV15: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { title, imageUrl } = config;

  return (
    <div
      className={cn(
        "shimmer-loading relative aspect-3/4 w-full rounded-md",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <ImageComponent
        src={imageUrl}
        alt={`${title}-alt`}
        fill
        className="rounded-md object-contain"
      />
    </div>
  );
};

export default CardV15;
