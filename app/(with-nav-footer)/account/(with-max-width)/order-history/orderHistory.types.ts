import { OrderStatusEnum } from "enums/orderStatus.enum";

export type OrderHistory = {
  _id: string;
  orderId: string;
  cartIds: string[];
  skuIds: string[];
  shippingAddress: string;
  billingAddress: string;
  orderStatus: OrderStatusEnum;
  totalPayment: number;
  totalDiscount: number;
  totalCharges: number;
  finalPayment: number;
  userId: string;
  createdDate: string;
  updatedDate: string;
  currencyCountry: string;
  currencyRate: number;
};
