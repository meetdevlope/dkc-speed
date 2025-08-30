import {
  PreOrderSkuStatusTypes,
  PreOrderStatusTypes,
  ShipmentStatusTypes,
} from "app/(with-nav-footer)/account/(with-max-width)/my-pre-order/action";
import { WardrobeInventoryWarnType } from "app/(with-nav-footer)/account/digital-wardrobe/wardrobe.types";
import { OrderStatusEnum } from "enums/orderStatus.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import { RentOrderStatusTypes } from "enums/rentOrderStatusTypes";
import { ReturnBagStatusTypes } from "enums/returnBagType.enum";

export const returnBagStatusMapper: Record<ReturnBagStatusTypes, string> = {
  [ReturnBagStatusTypes.initiated]: "Initiated",
  [ReturnBagStatusTypes.confirmed]: "Confirmed",
  [ReturnBagStatusTypes.dispatched]: "Dispatched",
  [ReturnBagStatusTypes.delivered]: "Delivered",
  [ReturnBagStatusTypes.processing]: "Processing",
  [ReturnBagStatusTypes.in_verification]: "In Verification",
  [ReturnBagStatusTypes.live]: "Live",
  [ReturnBagStatusTypes.cancelled]: "Cancelled",
};

export const orderStatusMapper: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.initiated]: "Initiated",
  [OrderStatusEnum.payment_confirmed]: "Payment Confirmed",
  [OrderStatusEnum.dispatched]: "Dispatched",
  [OrderStatusEnum.delivered]: "Delivered",
  [OrderStatusEnum.cancelled]: "Cancelled",
};

export const rentOrderStatusMapper: Record<RentOrderStatusTypes, string> = {
  [RentOrderStatusTypes.initiated]: "Initiated",
  [RentOrderStatusTypes.payment_confirmed]: "Payment Confirmed",
  [RentOrderStatusTypes.dispatched]: "Dispatched",
  [RentOrderStatusTypes.delivered]: "Delivered",
  [RentOrderStatusTypes.return_initiated]: "Return Initiated",
  [RentOrderStatusTypes.return_confirmed]: "Return Confirmed",
  [RentOrderStatusTypes.return_in_transit]: "Return In Transit",
  [RentOrderStatusTypes.returned]: "Returned",
  [RentOrderStatusTypes.cancelled]: "Cancelled",
  [RentOrderStatusTypes.product_processing]: "Product Processing",
  [RentOrderStatusTypes.restocked]: "Restock",
  [RentOrderStatusTypes.deposit_returned]: "Deposit Refunded",
};

export const productStatusMapper: Record<ProductStatusTypes, string> = {
  [ProductStatusTypes.available]: "Available",
  [ProductStatusTypes.sold]: "Sold",
  [ProductStatusTypes.rented]: "Rented",
};

export const PreOrderStatusLabels: Record<PreOrderStatusTypes, string> = {
  initiated: "Initiated",
  payment_confirmed: "Payment Confirmed",
  processing: "Processing",
  dispatched: "Dispatched",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ShipmentStatusLabels: Record<ShipmentStatusTypes, string> = {
  not_booked: "Not Booked",
  shipment_booked: "Shipment Booked",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

export const PreOrderSkuStatusLabels: Record<PreOrderSkuStatusTypes, string> = {
  initiated: "Initiated",
  payment_confirmed: "Payment Confirmed",
  inventory_ordered: "Inventory Ordered",
  inventory_dispatched: "Inventory Dispatched",
  inventory_received: "Inventory Received",
  cancelled: "Cancelled",
};

export const wearTypeMapper: Record<WardrobeInventoryWarnType, string> = {
  [WardrobeInventoryWarnType.never_worn]: "Never Worn",
  [WardrobeInventoryWarnType.tried_on_only]: "Tried On Only",
  [WardrobeInventoryWarnType.lightly_worn]: "Lightly Worn",
  [WardrobeInventoryWarnType.well_loved]: "Well Loved",
  [WardrobeInventoryWarnType.play_wear]: "Play Wear",
};
