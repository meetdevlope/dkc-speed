import { Icons } from "components/Icons";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import {
  ActionUiConfig,
  StaticBannerConfig,
} from "types/cms/banner/bannerWidget.types";
import ActionUIConfigProvider from "../ActionUIConfigProvider";

type StaticBannerV2Props = {
  bannerConfig: StaticBannerConfig;
};

const StaticBannerV2: React.FC<StaticBannerV2Props> = (props) => {
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
      <div className={`relative h-56 w-full md:h-96`}>
        <div
          className="relative h-full w-full"
          style={{
            aspectRatio: ratio,
            backgroundColor,
          }}
        >
          <ImageComponent
            src={imageUrl}
            fill
            alt={`${title}-image`}
            objectFit="cover"
          />
        </div>
        <div className="absolute bottom-2 left-2 flex gap-3 border-b-2 border-b-black bg-white px-4 py-2 md:bottom-4 md:left-4">
          <div>
            <h4 className="text-base md:text-lg"> {title} </h4>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          {isAction && (
            <span className="hidden md:block">
              <Icons.arrow />
            </span>
          )}
        </div>
      </div>
    </ActionUIConfigProvider>
  );
};

export default StaticBannerV2;
