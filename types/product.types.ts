import { DiscountTypeEnum } from "enums/discountType.enum";
import { OptionTypeEnum } from "enums/optionType.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import { SEO } from "./seo.types";

interface ProductOption {
  type: OptionTypeEnum;
  key: string;
  value: string;
}

export type RentPriceDistribution = {
  days: number;
  discount: number;
};

export type ProductOptionValues = {
  name: string;
  value: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  eligibleForRent: boolean;
  category: string;
  authenticationId: string;
  authenticateProduct: boolean;
  certificateUrl: string;
  collection: string;
  brand: string;
  seller: string;
  sizeChart: string;
  tags: string[];
  options: ProductOption[];
  photos: string[];
  totalPrice: number;
  rentPrice: number;
  discountAmount: number;
  discountType: DiscountTypeEnum;
  rentDiscountType: DiscountTypeEnum;
  rentPriceDistribution: string;
  sellingPrice: number;
  skuId: string;
  barcodeNumber: number;
  createdDate: string;
  wishlistNumber: number;
  updatedDate: string;
  slug: string;
  dppUrl: string;
  productStatus: ProductStatusTypes;
  shippingDetail: {
    weight: number;
    length: number;
    width: number;
    height: number;
    _id: string;
  };
  seo: SEO;
  __v: number;
  isLive: boolean;
  preOrderRefId?: string;
  supplierId?: string;
  type?: "preOrder" | "normal";
  quantity?: number;
};

export type DiscountResponse = {
  discountTitle: string;
  discountMap: Record<string, number>;
};

export type Category = {
  _id: string;
  name: string;
  imageUrl: string;
  active: boolean;
};

type SizeChartRow = {
  [column: string]: string;
};

export type SizeChartValueData = {
  measurementUnit: string;
  columns: string[];
  rows: SizeChartRow[];
};

export type SizeChart = {
  name: string;
  description: string;
  value: string;
  numberOfProducts: number;
  active: boolean;
};

export type RentedDaysResponse = {
  rentEndDate: string;
  rentStartDate: string;
}[];

export type ProductBadge = {
  name: string;
  backgroundColor: string;
  textColor: string;
  isManual: boolean;
  productList: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productQuery: any;
  createdDate: Date;
  active: boolean;
};

export type ProductReview = {
  productId: string;
  userId: string;
  description: string;
  images: string[];
  ratings: number;
  createdDate: Date;
  userName: string;
  userPhoto: string;
  userEmail: string;
  _id: string;
};

export type CreateProductReviewReq = {
  orderId: string;
  ratings: number;
  skuId: string;
  description: string;
  images: string[];
  alreadyRated?: boolean;
};

export type EditProductReviewReq = {
  description: string;
  ratings: number;
  images: string[];
};
