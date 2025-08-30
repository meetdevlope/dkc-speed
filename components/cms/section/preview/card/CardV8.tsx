import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV8: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title, description, tag } = config;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-white p-4",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <ImageComponent
        src={imageUrl}
        alt={`${title}-alt`}
        width={256}
        height={256}
        className="m-auto aspect-[4/3] w-full rounded object-cover object-top"
      />
      <h6 className="mt-2 font-secondary font-medium text-primary-500 md:text-base">
        {" "}
        {title}{" "}
      </h6>
      <p className="mb-3 font-primary text-gray-500 md:text-sm"> {tag} </p>
      <p className="text-gray-400 md:text-sm"> {description} </p>
    </div>
  );
};

export default CardV8;
