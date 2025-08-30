import { Category, Product } from "types/product.types";
import { FormItemTypeInfo, FormSettings } from "./form/formTypes";
import { Brand } from "types/brand.types";
import { Collection } from "types/collection.types";

export enum BaseWidgetType {
  text = "text",
  image = "image",
  form = "form",
  component = "component",
  row = "row",
  column = "column",
  grid = "grid",
  carousal = "carousal",
  icon = "icon",
  stack = "stack",
  grpView = "grpView",
  envFootPrint = "envFootPrint",
  timeLine = "timeLine",
  container = "container",
  brandChecker = "brandChecker",
  commissionStructure = "commissionStructure",
  faq = "faq",
}

export type WidgetMeta = {
  _id: string;
  name: string;
  tag: string;
  type: string;
  imageUrl: string;
  staffId: string;
};

export type WidgetConfigFromAPI = {
  _id: string;
  configJson: string;
  refId: string;
};

export type WidgetDetailedResponse = {
  id: string;
  name: string;
  tag: string;
  type: string;
  imageUrl: string;
  staffId: string;
  config: WidgetImpl;
};

export interface WidgetImpl {
  mobileWidgetModel: WidgetModel;
  tabWidgetModel: WidgetModel;
  webWidgetModel: WidgetModel;
  widgetProps: WidgetPropList;
}

export type WidgetPadding = {
  all?: number;
  paddingL?: number;
  paddingR?: number;
  paddingT?: number;
  paddingB?: number;
  type: "all" | "individual";
};
export type WidgetMargin = {
  all?: number;
  marginL?: number;
  marginR?: number;
  marginT?: number;
  marginB?: number;
  type: "all" | "individual";
};

export type WidgetAlignment = "start" | "center" | "end";
export type WidgetWidthType = "px" | "percentage" | "fit-content";

export interface WidgetModel {
  id: string;
  label: string;
  type: BaseWidgetType;
  padding: WidgetPadding;
  isAutoWidth?: boolean;
  isAbsoluteWidth?: boolean;
  extendedBg?: boolean;
  margin: WidgetMargin;
  width: number;
  widthType: WidgetWidthType;
  bgColor: string;
  isAction: boolean;
  onClickConfig?: CtaActionConfig;
  borderRadius?: number;
  borderThikness: number;
  borderColor: string;
  isBorder: boolean;
  fontFamily: "primary" | "secondary";
}

export interface TextWidgetModel extends WidgetModel {
  text: string;
  propTextField?: string;
  fontSize: number;
  fontWeight:
    | "bold"
    | "regular"
    | "light"
    | "thin"
    | "semi_bold"
    | "medium"
    | "extra_bold";
  textAlign: WidgetAlignment;
  color: string;
  isAdvanced: boolean;
  isUnderLine?: boolean;
}

export interface BrandCheckerWidgetModel extends WidgetModel {
  title: string;
  hideTitle: boolean;
  description: string;
  hideDescription: boolean;
  tagLine: string;
  hideTagLine: boolean;
  imageUrl: string;
  hideImage: boolean;
}

export type ImageFitType = "cover" | "contain";

export interface EnvironmentalFootPrintWidgetModel extends WidgetModel {
  dataType: "overall" | "user";
}

export interface ImageWidgetModel extends WidgetModel {
  imageUrl: string;
  propImageUrl?: string;
  altText: string;
  ratio: number;
  imageAlign: WidgetAlignment;
  fit: ImageFitType;
}

export interface RowWidgetModel extends WidgetModel {
  horizontalAlign: WidgetAlignment;
  verticalAlign: WidgetAlignment;
  gap: number;
  childrenConfig: WidgetModel[];
}

export interface ColumnWidgetModel extends WidgetModel {
  horizontalAlign: WidgetAlignment;
  verticalAlign: WidgetAlignment;
  gap: number;
  childrenConfig: WidgetModel[];
}

export type ComponentOptionType = {
  name: string;
  id: string;
};
export interface CarousalWidgetModel extends WidgetModel {
  componentOptions: ComponentOptionType[];
  autoScroll: boolean;
  autoScrollDurationMillis: number;
  childrenPerSlide: number;
  maxHeight: number;
  scrollAnimationMillis: number;
  showDots: boolean;
  allowSnap: boolean;
}

export interface StackWidgetModel extends WidgetModel {
  baseChildConfig?: WidgetModel;
  childrenConfig: WidgetModel[];
  childVsPositionMap: Record<string, WidgetPosition>;
}

export type WidgetPosition = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export interface ComponentWidgetModel extends WidgetModel {
  componentId: string;
  // widgetProps?: WidgetPropList;
  // TO-DO add proper value type based on prop type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widgetValues?: Record<string, any>;
  widgetPropValues?: Record<string, string>;
}

export interface CommissionStructureWidgetModel extends WidgetModel {
  shouldShowBrandStructure: boolean;
  title: string;
}

export interface GroupViewWidgetModel extends WidgetModel {
  config: GroupViewConfig;
}

export interface TimelineWidgetModel extends WidgetModel {
  timelineList: TimelineWidgetStepModel[];
}

export interface TimelineWidgetStepModel {
  id: string;
  step: string;
  label: string;
  description: string;
}

export interface GridWidgetModel extends WidgetModel {
  columns: number;
  gap: number;
  childrenConfig: WidgetModel[];
}

export interface ContainerWidgetModel extends WidgetModel {
  height: number;
}

export interface FormWidgetModel extends WidgetModel {
  formId: string;
}

export interface WidgetProps {
  label: string;
  id: string;
  key: string;
  type: WidgetPropDataType;
}

export interface WidgetPropList {
  widgetProps: WidgetProps[];
}

export type FormConfigType = {
  item: FormItemTypeInfo[];
  setting: FormSettings;
  refId?: string;
  createdDate?: Date;
  _id?: string;
};

export type FormSubmitReq = {
  refId: string;
  data: Record<string, string>;
};

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
  | "simpleBag"
  | "brandBag"
  | "registerBag"
  | "productDetails"
  | "customPage"
  | "inAppPages"
  | "blog";

export interface CtaActionConfig {
  value: string;
  actionType: CtaActionType;
  redirectType?: CtaRedirectionType;
}

export type WidgetPropDataType =
  | "text"
  | "imageUrl"
  | "onClick"
  | "product"
  | "collection"
  | "productList"
  | "collectionList"
  | "brandList"
  | "brand";

export type ComponentWidgetTypes = {
  key: string;
  json: string;
};

export type HeaderNavOptionType = {
  id: string;
  label: string;
  imageUrl?: string;
  hasChild: boolean;
  ctaConfig?: CtaActionConfig;
  subNavOptions?: HeaderNavOptionType[];
};

export type HeaderWidgetType = {
  navOptions: HeaderNavOptionType[];
  logo?: string;
};

export interface GroupViewWidgetModel extends WidgetModel {
  config: GroupViewConfig;
}

export type CardType =
  | "product"
  | "category"
  | "collection"
  | "brand"
  | "blog"
  | "custom";

export type AppCardVersion =
  | "v1"
  | "v2"
  | "v3"
  | "v4"
  | "v5"
  | "v6"
  | "v7"
  | "v8"
  | "v9"
  | "v10"
  | "v11"
  | "v12"
  | "v13"
  | "v14"
  | "v15";

export type InventoryOptions = Pick<Product, "_id" | "name">;
export type CategoryOptions = Pick<Category, "_id" | "name">;
export type BrandOptions = Pick<Brand, "_id" | "name">;
export type CollectionOptions = Pick<Collection, "_id" | "title">;
export type BlogOptions = Pick<BlogType, "_id" | "title">;

export interface GroupViewConfig {
  cardType: CardType;
  customCardList: CustomAppCardModel[];
  appCardVersion: AppCardVersion; // Corresponds to AppCardVersion
  cardQuery: string;
  cardLimit: number;

  // prouduct
  isRecommendedProducts: boolean;
  isRecentProducts: boolean;
  productOptions: InventoryOptions[];

  // category
  categoryOptions: CategoryOptions[];

  // collection
  collectionOptions: CollectionOptions[];
  blogOptions: BlogOptions[];
  // brand
  brandOptions: BrandOptions[];

  // Grid view params
  horizontalGap: number;
  verticalGap: number;
  crossItemCount: number;
  cardViewType: string; // Corresponds to CardViewType

  // List view params
  gap: number;
  startPadding: number;
}

export interface CustomAppCardModel {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  imageUrl: string;
  isAction: boolean;
  onClickConfig?: CtaActionConfig;
}
export type FAQList = {
  question: string;
  answer: string;
};

export type FaqType = {
  _id?: string;
  title: string;
  description: string;
  faqList: FAQList[];
  createdDate?: string;
};

export interface FaqwidgetModel extends WidgetModel {
  faqId: string;
  hideDescription: boolean;
  hideTitle: boolean;
}

export type BlogType = {
  _id?: string;
  image: string;
  title: string;
  author: string;
  slug: string;
  description: string;
  publishedDate?: string;
};
