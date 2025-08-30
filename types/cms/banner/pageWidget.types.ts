import { ScrollBannerConfig, StaticBannerConfig } from "./bannerWidget.types";

export enum SupportedWidgetType {
  staticBanner = "staticBanner",
  scrollBanner = "scrollBanner",
}

export interface PageWidgetConfig {
  type: SupportedWidgetType;
  id: string;
}

export interface PageStaticBannerWidgetConfig extends PageWidgetConfig {
  bannerConfig: StaticBannerConfig;
}

export interface PageScrollerBannerWidgetConfig extends PageWidgetConfig {
  scrollBannerConfig: ScrollBannerConfig;
}
