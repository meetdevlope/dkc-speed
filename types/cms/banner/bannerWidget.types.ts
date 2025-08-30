export enum StaticBannerVersion {
  v1 = "v1",
  v2 = "v2",
  v3 = "v3",
  v4 = "v4",
}
export enum SupportedScrollBannerVersion {
  v1 = "v1",
}

export type StaticBannerConfig = {
  version: StaticBannerVersion;
  title: string;
  description: string;
  imageUrl: string;
  isAction: boolean;
  actionConfig?: ActionConfig;
  actionUiConfig?: ActionUiConfig;
  id: string;
  backgroundColor: string;
  surfaceColor: string;
  ratio: number;
};

export interface ScrollBannerConfig {
  bannerList: StaticBannerConfig[];
  version: SupportedScrollBannerVersion;
  autoScroll: boolean;
  delayMillis: number;
  scrollAnimationMillis: number;
  showDots: boolean;
  allowSnap: boolean;
}

export enum ActionType {
  custom = "custom",
  collection = "collection",
  brand = "brand",
  category = "category",
}

export type ActionUiConfig = {
  label?: string;
  type: "banner" | "cta";
};

export type ActionConfig = {
  type: ActionType;
  url?: string;
  category?: string;
  brand?: string;
  collection?: string;
};
