import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import {
  ActionUiConfig,
  StaticBannerConfig,
} from "types/cms/banner/bannerWidget.types";
import ActionUIConfigProvider from "../ActionUIConfigProvider";

type StaticBannerV1Props = {
  bannerConfig: StaticBannerConfig;
};

const StaticBannerV1: React.FC<StaticBannerV1Props> = (props) => {
  const { bannerConfig } = props;
  const {
    backgroundColor,
    description,
    imageUrl,
    isAction,
    ratio,
    title,
    actionUiConfig,
  } = bannerConfig;

  return (
    <ActionUIConfigProvider actionUiConfig={actionUiConfig as ActionUiConfig}>
      <div
        className="my-4 flex w-full"
        style={{ aspectRatio: ratio, backgroundColor }}
      >
        <div className="relative hidden h-full flex-grow lg:block"></div>
        <div className="m-6 mr-0 flex w-[40%] flex-col justify-center md:m-0 md:ml-4 md:items-center lg:m-0 lg:w-[30%]">
          <h2 className="uppercase sm:text-3xl md:text-center md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <div
            className="text-description md:mt-2 md:text-center"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isAction && (
            <Button
              className="mt-6 w-fit"
              endIcon={
                <Icon
                  name="chevron"
                  color="var(--neutral-400)"
                  iconType="stroke"
                  className="-rotate-90"
                  size={22}
                />
              }
              size="sm"
            >
              {actionUiConfig?.label}
            </Button>
          )}
        </div>
        <div className="relative h-full flex-grow">
          <ImageComponent
            src={imageUrl}
            fill
            alt="hero-image"
            objectFit="cover"
            objectPosition="bottom"
          />
        </div>
      </div>
    </ActionUIConfigProvider>
  );
};

export default StaticBannerV1;
