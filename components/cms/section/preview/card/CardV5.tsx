import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";

const CardV5: React.FC<AppCardProps> = (props) => {
  const { config, version } = props;
  const { imageUrl, title } = config;

  return (
    <div
      className="relative aspect-square md:aspect-video"
      aria-label={version}
    >
      {imageUrl ? (
        <ImageComponent
          alt={`${title}-alt`}
          src={imageUrl}
          fill
          className="rounded-lg object-top"
        />
      ) : (
        <div className="fall h-full rounded-lg">
          <h6 className="truncate font-medium text-white">{title}</h6>
        </div>
      )}
      <div className="absolute right-0 bottom-1 left-0 mx-1 rounded-md border border-white bg-black/15 px-1 py-0.5 backdrop-blur-md backdrop-saturate-50">
        <h6 className="truncate text-center font-secondary text-base text-white uppercase text-shadow-neutral-500/60 text-shadow-xs">
          {title}
        </h6>
      </div>
    </div>
  );
};

export default CardV5;
