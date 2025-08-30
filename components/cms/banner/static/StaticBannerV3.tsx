import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import {
  ActionUiConfig,
  StaticBannerConfig,
} from "types/cms/banner/bannerWidget.types";
import ActionUIConfigProvider from "../ActionUIConfigProvider";

type StaticBannerV3Props = {
  bannerConfig: StaticBannerConfig;
};

const StaticBannerV3: React.FC<StaticBannerV3Props> = (props) => {
  const { bannerConfig } = props;
  const {
    backgroundColor,
    description,
    imageUrl,
    isAction,
    ratio,
    title,
    surfaceColor,
    actionUiConfig,
  } = bannerConfig;

  return (
    <ActionUIConfigProvider actionUiConfig={actionUiConfig as ActionUiConfig}>
      <div
        className="my-4 flex h-[460px] flex-col md:h-[320px] md:flex-row"
        style={{
          backgroundColor,
        }}
      >
        <div
          className="bg-beige md:bg-secondary relative h-full w-full md:w-[55%]"
          style={{
            aspectRatio: ratio,
            backgroundColor: surfaceColor,
          }}
        >
          <ImageComponent
            fill
            src={imageUrl}
            alt="sell-marketing-image"
            objectFit="contain"
            objectPosition="bottom center"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center p-5 md:w-[45%]">
          <h2 className="md:text-3xl lg:text-4xl"> {title} </h2>
          <div
            className="text-description mt-2 max-w-[480px] md:mt-3 md:text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isAction && (
            <Button
              className="mt-8 text-nowrap"
              endIcon={
                <Icon
                  name="chevron"
                  color="var(--neutral-400)"
                  iconType="stroke"
                  className="-rotate-90"
                  size={22}
                />
              }
            >
              Sell Your Items
            </Button>
          )}
        </div>
      </div>
    </ActionUIConfigProvider>
  );
};

export default StaticBannerV3;
