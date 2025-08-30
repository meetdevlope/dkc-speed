import ActionWrapper from "components/cms/action/ActionWrapper";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { CtaActionConfig } from "types/cms/component.types";
import { AppCardProps } from "./CardRenderer";
import { cn } from "utils/helpers";

const CardV10: React.FC<AppCardProps> = (props) => {
  const { config, version, isWidthCard } = props;
  const { imageUrl, title, tag, onClickConfig } = config;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-blue-light p-4",
        isWidthCard ? "min-w-64" : "w-full",
      )}
      aria-label={version}
    >
      <div className="shimmer-loading relative mb-3 aspect-video w-full rounded-md">
        <ImageComponent
          src={imageUrl}
          alt={`${title}-alt`}
          fill
          className="rounded-md"
        />
      </div>
      <h6 className="mt-1 font-secondary font-medium md:text-base">{title}</h6>
      <span className="mt-3 w-fit border-t border-t-primary-500">
        <ActionWrapper onClickConfig={onClickConfig as CtaActionConfig}>
          <h6 className="text-description md:text-sm"> {tag} </h6>
        </ActionWrapper>
      </span>
    </div>
  );
};

export default CardV10;
