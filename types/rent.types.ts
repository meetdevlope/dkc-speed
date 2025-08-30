import { DiscountTypeEnum } from "enums/discountType.enum";
import { RentOrderStatusTypes } from "enums/rentOrderStatusTypes";

export type GetRentRequestTypes = {
  perDayPrice: number;
  days: number;
  discountType: DiscountTypeEnum;
  discount: number | string;
};

export type MyRentals = {
  _id: string;
  skuId: string;
  orderRef: string;
  shippingStatus: string;
  shippingStatusList: string;
  orderStatus: RentOrderStatusTypes;
  orderStatusList: string;
  finalPayment: number;
  discount: number;
  userId: string;
  rentDays: number;
  rentStartDate: string;
  rentEndDate: string;
  createdDate: Date;
  updatedDate: Date;
};
