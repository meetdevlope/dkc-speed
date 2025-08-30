import ActionWrapper from "components/cms/action/ActionWrapper";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { CtaActionConfig } from "types/cms/component.types";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV13: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { title, description, onClickConfig, tag, imageUrl } = config;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-transparent",
        isWidthCard && "min-w-64",
      )}
      aria-label={version}
    >
      <div className="shimmer-loading relative mb-3 aspect-square w-full rounded-md">
        <ImageComponent
          src={imageUrl}
          alt={`${title}-alt`}
          fill
          className="rounded-md"
        />
      </div>
      <h6 className="mt-1 font-secondary font-medium text-white md:text-base">
        {title}
      </h6>
      <p className="mt-2 mb-4 text-gray-400 md:text-sm"> {description} </p>
      <button className="mt-auto w-full rounded bg-primary-500 px-4 py-2 text-white">
        <ActionWrapper onClickConfig={onClickConfig as CtaActionConfig}>
          {tag}
        </ActionWrapper>
      </button>
    </div>
  );
};

export default CardV13;
