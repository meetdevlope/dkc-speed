import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import { DiscountTypeEnum } from "enums/discountType.enum";

export type Cart = {
  _id?: string;
  cartRefId: string;
  type: CartTypeEnum;
  quantity: number;
  userDeviceId: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
};

export type BagCart = {
  brandId: string;
  image: string;
  type: BagCartEnum;
  userId: string;
  price: number;
  userDeviceId: string;
  createdDate: Date;
  updatedDate: Date;
  skuIds?: string[];
  _id?: string;
};

export type ProductCart = {
  skuId: string;
  userId: string;
  userDeviceId: string;
  createdDate: Date;
  updatedDate: Date;
  price: number;
  originalPrice: number;
  depositAmount: number;
  discount: number | string;
  forRent: boolean;
  rentStartDate: Date;
  discountType: DiscountTypeEnum;
  rentDays: number;
  rentEndDate: Date;
  name: string;
  image: string;
  _id?: string;
};

export type CartResponse = {
  cart: Cart;
  details?: BagCart | ProductCart;
};

export type AddToCartRequestBase = {
  type: CartTypeEnum;
  quantity: number;
  userDeviceId: string;
};

export type BagCartReqBase = {
  type: BagCartEnum;
  price: number;
  skuID?: string;
  brandId?: string;
};

export type BagCartReq = BagCartReqBase &
  (
    | { type: BagCartEnum.normal }
    | { type: BagCartEnum.dpp; skuID: string }
    | { type: BagCartEnum.brand; brandId: string }
  );

export type AddToCartRequest =
  | (AddToCartRequestBase & {
      type: CartTypeEnum.bag;
      bagCart: BagCartReq;
    })
  | (AddToCartRequestBase & {
      type: CartTypeEnum.product_rent;
      productCart: ProductCartRentDetails;
    })
  | (AddToCartRequestBase & {
      type: CartTypeEnum.product_purchase;
      productCart: ProductCartPurchaseDetails;
    });

export type ProductCartRentDetails = {
  skuId: string;
  rentStartDate: Date | string;
  rentEndDate: Date | string;
  forRent: true;
  price: number;
  originalPrice: number;
  discountType: DiscountTypeEnum;
  discount: number;
  rentDays: number;
};

export type ProductCartPurchaseDetails = {
  skuId: string;
  rentStartDate: "";
  rentEndDate: "";
  originalPrice: number;
  price: number;
  forRent: false;
  discountType: DiscountTypeEnum;
  discount: number;
};

export type EditQuantityRequest = {
  id: string;
  quantity: number;
};

export type ShipmentOptionsResponse = {
  _id: string;
  company: string;
  name: string;
  description: string;
  cost: number;
  serviceId: string;
  type: string;
};

export type PaymentOptionType = {
  name: string;
  logo: string;
  bgColor: string;
  key: string;
};

export type PaymentOptionResponseType = {
  buyNowPayLater: PaymentOptionType[];
  expressCheckout: PaymentOptionType[];
};
