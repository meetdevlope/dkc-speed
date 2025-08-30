import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { cn } from "utils/helpers";
import { AppCardProps } from "./CardRenderer";

const CardV6: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title, description } = config;

  return (
    <div
      className={cn("w-full", isWidthCard ? "min-w-72" : "w-full")}
      aria-label={version}
    >
      <div className="shimmer-loading relative aspect-square w-full">
        <ImageComponent src={imageUrl} fill alt={`${title}-alt`} />
      </div>
      <h6 className="mt-3 mb-2 font-secondary font-medium uppercase md:text-base">
        {" "}
        {title}{" "}
      </h6>
      <p className="text-neutral-400 md:text-sm"> {description} </p>
    </div>
  );
};

export default CardV6;
