import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";

const CardV2: React.FC<AppCardProps> = (props) => {
  const { config, version } = props;
  const { imageUrl, title } = config;

  return (
    <div
      className="bg-off-white relative mb-3 aspect-square rounded-lg"
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
      <div className="absolute right-0 -bottom-2 left-0 mx-auto w-fit rounded bg-white px-1 py-0.5 shadow">
        <h6 className="text-center font-secondary text-sm font-medium">
          {title}
        </h6>
      </div>
    </div>
  );
};

export default CardV2;
