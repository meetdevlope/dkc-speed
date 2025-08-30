import React from "react";
import {
  ScrollBannerConfig,
  SupportedScrollBannerVersion,
} from "types/cms/banner/bannerWidget.types";
import ScrollBannerV1 from "./ScrollBannerV1";

type ScrollBannerWrapperProps = {
  bannerConfig: ScrollBannerConfig;
};

const ScrollBannerWrapper: React.FC<ScrollBannerWrapperProps> = (props) => {
  const { bannerConfig } = props;
  const { version } = bannerConfig || {};

  switch (version) {
    case SupportedScrollBannerVersion.v1:
      return <ScrollBannerV1 />;

    default:
      return "Scroll Banner version not supported";
  }
};

export default ScrollBannerWrapper;
