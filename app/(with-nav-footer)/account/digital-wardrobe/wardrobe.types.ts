import { CtaActionConfig } from "types/cms/component.types";
import { Product } from "types/product.types";
import { WardrobeItem } from "./action";
import { ButtonProps } from "components/Button";

export type AiRecommendationSource =
  | "none"
  | "ai"
  | "wardrobeCount"
  | "wardrobeItem";
export type CtaActionType =
  | "addBagToCart"
  | "addBrandBagToCart"
  | "addProductToCart"
  | "redirect"
  | "external-link"
  | "start-selling-brand-portal"
  | "valuation"
  | "openPopup";
export type CtaRedirectionType =
  | "collection"
  | "category"
  | "brand"
  | "recommendation"
  | "inAppPages"
  | "simpleBag"
  | "brandBag"
  | "registerBag"
  | "productDetails"
  | "customPage"
  | "blog";
export type CtaFillType = "filled" | "outlined" | "text";

export type AiRecommendationActionConfig = {
  id: string;
  label: string;
  fillType: CtaFillType;
  actionConfig: CtaActionConfig;
};

export type AiRecommendationConfig = {
  title: string;
  description: string;
  source: AiRecommendationSource;
  aiRecommendationType?: RecommendationTypeEnum;
  wardrobeCountRecommendationType?: WardrobeInventoryWarnType;
  id: string;
  actions: AiRecommendationActionConfig[];
};

export enum WardrobeInventoryWarnType {
  never_worn = "never_worn",
  tried_on_only = "tried_on_only",
  lightly_worn = "lightly_worn",
  well_loved = "well_loved",
  play_wear = "play_wear",
}

export type RecommendationResponse = {
  schema: AiRecommendationConfig;
  inventoryList?: Product[];
  wardrobeItemList?: WardrobeItem[];
};

export enum RecommendationTypeEnum {
  "style_base" = "style_base",
  "seasonal_or_occasional" = "seasonal_or_occasional",
  "trendy" = "trendy",
  "matching" = "matching",
  "location_or_festive" = "location_or_festive",
}

export interface RecommendationListRequest {
  source: AiRecommendationSource[];
  aiRecommendationType?: RecommendationTypeEnum[];
  wardrobeCountRecommendationType?: WardrobeInventoryWarnType[];
  country: string;
  limit: number;
}

export interface RecommendationDetailsRequest {
  country: string;
  id: string;
  limit?: number;
}

export interface MatchingRecommendationRequest {
  country: string;
  productId: string;
  limit?: number;
}

export const fillToVariantMap: Record<CtaFillType, ButtonProps["variant"]> = {
  filled: "primary",
  outlined: "outline",
  text: "text",
};
