import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";

const CardV7: React.FC<AppCardProps> = (props) => {
  const { config, version } = props;
  const { imageUrl, title, description } = config;

  return (
    <div
      className="flex flex-col items-center rounded bg-white px-2 py-4"
      aria-label={version}
    >
      <div className="shimmer-loading relative mb-3 aspect-square size-12 shrink-0">
        <ImageComponent src={imageUrl} fill alt={`${title}-alt`} />
      </div>
      <h6 className="mt-4 text-center font-secondary uppercase md:text-base">
        {" "}
        {title}{" "}
      </h6>
      <p className="text-description mt-1 text-center text-neutral-400 md:text-sm">
        {" "}
        {description}{" "}
      </p>
    </div>
  );
};

export default CardV7;
