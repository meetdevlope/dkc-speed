import { fetchData } from "utils/apiCaller";

export const getMyPreOrders = async (token: string): Promise<PreOrder[]> => {
  return fetchData<PreOrder[]>(`/order/pre-order/get`, {
    token: token,
    errorMessage: "my-pre-orders",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getMyPreOrderDetails = async (
  token: string,
  id: string,
): Promise<PreOrder> => {
  return fetchData<PreOrder>(`/order/pre-order/details/${id}`, {
    token: token,
    errorMessage: "pre-order-details",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getPreOrderSku = async (
  token: string,
  preOrderId: string,
): Promise<PreOrderSku[]> => {
  return fetchData<PreOrderSku[]>(`/order/pre-order/sku/${preOrderId}`, {
    token: token,
    errorMessage: "pre-order-sku",
    shouldNotThrowErrorOnCatch: true,
  });
};

export interface PreOrder {
  _id: string;
  itemIds: string[];
  cartIds: string[];
  cart: string;
  preOrderId: string;
  suppliers: string[];
  orderRef: string;
  shippingAddress: string;
  billingAddress: string;
  shippingStatus: ShipmentStatusTypes;
  shippingStatusList: string;
  orderStatus: PreOrderStatusTypes;
  orderStatusList: string;
  totalPayment: number;
  totalDiscount: number;
  finalPayment: number;
  couponConfig: string;
  trackingNumber: string;
  couponId: string;
  userId: string;
  totalProductPurchased: number;
  currencyCountry: string;
  selectedShipmentId: string;
  shipmentReferenceId: string;
  currencyRate: number;
  productStatusSkuMap: string;
  createdDate: Date;
  orderFromWhatsapp: boolean;
  expDeliveryDate: Date;
  updatedDate?: Date;
}

export interface PreOrderSku {
  skuId: string;
  preOrderRef: string;
  shippingAddress: string;
  billingAddress: string;
  orderStatus: PreOrderSkuStatusTypes;
  orderStatusList: string;
  price: number;
  returnAmount: string;
  createdDate: Date;
  expDeliveryDate: Date;
  updatedDate?: Date;
}

export enum PreOrderStatusTypes {
  initiated = "initiated",
  payment_confirmed = "payment_confirmed",
  processing = "processing",
  dispatched = "dispatched",
  delivered = "delivered",
  cancelled = "cancelled",
}

export enum ShipmentStatusTypes {
  not_booked = "not_booked",
  shipment_booked = "shipment_booked",
  in_transit = "in_transit",
  out_for_delivery = "out_for_delivery",
  delivered = "delivered",
}

export enum PreOrderSkuStatusTypes {
  initiated = "initiated",
  payment_confirmed = "payment_confirmed",
  inventory_ordered = "inventory_ordered",
  inventory_dispatched = "inventory_dispatched",
  inventory_received = "inventory_received",
  cancelled = "cancelled",
}
