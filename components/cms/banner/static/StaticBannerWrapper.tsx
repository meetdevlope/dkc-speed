import React from "react";
import {
  StaticBannerConfig,
  StaticBannerVersion,
} from "types/cms/banner/bannerWidget.types";
import StaticBannerV1 from "./StaticBannerV1";
import StaticBannerV2 from "./StaticBannerV2";
import StaticBannerV3 from "./StaticBannerV3";
import StaticBannerV4 from "./StaticBannerV4";

type StaticBannerWrapperProps = {
  bannerConfig: StaticBannerConfig;
};

const StaticBannerWrapper: React.FC<StaticBannerWrapperProps> = (props) => {
  const { bannerConfig } = props;
  const { version } = bannerConfig;

  switch (version) {
    case StaticBannerVersion.v1:
      return <StaticBannerV1 {...props} />;
    case StaticBannerVersion.v2:
      return <StaticBannerV2 {...props} />;
    case StaticBannerVersion.v3:
      return <StaticBannerV3 {...props} />;
    case StaticBannerVersion.v4:
      return <StaticBannerV4 {...props} />;

    default:
      return "Static Banner version not supported";
  }
};

export default StaticBannerWrapper;
