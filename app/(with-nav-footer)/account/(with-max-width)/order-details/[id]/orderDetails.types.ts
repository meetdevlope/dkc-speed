import { OrderStatusEnum } from "enums/orderStatus.enum";
import { DiscountResponse } from "types/product.types";

export type OrderDetails = {
  _id: string;
  orderId: string;
  itemIds: string[];
  cartIds: string[];
  cart?: string;
  skuIds: string[];
  shippingAddress: string;
  billingAddress: string;
  orderStatus: OrderStatusEnum;
  orderStatusList: string;
  totalPayment: number;
  totalDiscount: number;
  totalCharges: number;
  finalPayment: number;
  userId: string;
  couponId: string;
  couponConfig: DiscountResponse;
  transactionId: string;
  totalBags: number;
  paymentConfig: string;
  bag: string;
  createdDate: string;
  shippingStatus: string;
  shippingStatusList: string;
  updatedDate: string;
  totalProductPurchased: number;
  totalProductRented: number;
  totalItems: number;
  productStatusSkuMap: string;
  currencyCountry: string;
  currencyRate: number;
  __v: number;
};

export type OrderPaymentDetails = Record<string, any>;

export type Order = {
  details: OrderDetails;
  paymentDetails: OrderPaymentDetails;
};
