import {
  PreOrderSkuStatusTypes,
  PreOrderStatusTypes,
} from "app/(with-nav-footer)/account/(with-max-width)/my-pre-order/action";
import { ChipColor } from "components/Chip";
import { OrderStatusEnum } from "enums/orderStatus.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import { RentOrderStatusTypes } from "enums/rentOrderStatusTypes";
import { ReturnBagStatusTypes } from "enums/returnBagType.enum";

export const getReturnBagStatusColor = (
  status: ReturnBagStatusTypes,
): ChipColor => {
  switch (status) {
    case ReturnBagStatusTypes.initiated:
      return "yellow";

    case ReturnBagStatusTypes.dispatched:
      return "teal";

    case ReturnBagStatusTypes.delivered:
      return "orange";

    case ReturnBagStatusTypes.processing:
      return "purple";

    case ReturnBagStatusTypes.in_verification:
      return "blue";

    case ReturnBagStatusTypes.live:
      return "green";

    case ReturnBagStatusTypes.cancelled:
      return "red";

    default:
      return "gray";
  }
};

export const getProductStatusColor = (
  status: ProductStatusTypes,
): ChipColor => {
  switch (status) {
    case ProductStatusTypes.sold:
      return "green";

    case ProductStatusTypes.rented:
      return "orange";

    case ProductStatusTypes.available:
      return "purple";

    default:
      return "gray";
  }
};

export const getReturnOrderStatusColor = (
  status: RentOrderStatusTypes,
): ChipColor => {
  switch (status) {
    case RentOrderStatusTypes.initiated:
      return "sky";

    case RentOrderStatusTypes.payment_confirmed:
      return "blue";

    case RentOrderStatusTypes.product_processing:
      return "purple";

    case RentOrderStatusTypes.dispatched:
      return "yellow";

    case RentOrderStatusTypes.delivered:
      return "orange";

    case RentOrderStatusTypes.return_initiated:
      return "gray";

    case RentOrderStatusTypes.return_in_transit:
      return "indigo";

    case RentOrderStatusTypes.returned:
      return "red";

    case RentOrderStatusTypes.restocked:
      return "teal";
    case RentOrderStatusTypes.deposit_returned:
      return "sky";

    case RentOrderStatusTypes.cancelled:
      return "pink";

    default:
      return "gray";
  }
};

export const getOrderStatusColor = (status: OrderStatusEnum): ChipColor => {
  switch (status) {
    case OrderStatusEnum.initiated:
      return "yellow";

    case OrderStatusEnum.payment_confirmed:
      return "pink";

    case OrderStatusEnum.dispatched:
      return "orange";

    case OrderStatusEnum.delivered:
      return "green";

    case OrderStatusEnum.cancelled:
      return "red";

    default:
      return "gray";
  }
};

export const getPreOrderStatusColor = (
  status: PreOrderStatusTypes,
): ChipColor => {
  switch (status) {
    case PreOrderStatusTypes.initiated:
      return "yellow";

    case PreOrderStatusTypes.payment_confirmed:
      return "pink";

    case PreOrderStatusTypes.processing:
      return "indigo";

    case PreOrderStatusTypes.dispatched:
      return "orange";

    case PreOrderStatusTypes.delivered:
      return "green";

    case PreOrderStatusTypes.cancelled:
      return "red";

    default:
      return "gray";
  }
};

export const getPreOrderSkuStatusColor = (
  status: PreOrderSkuStatusTypes,
): ChipColor => {
  switch (status) {
    case PreOrderSkuStatusTypes.initiated:
      return "yellow";

    case PreOrderSkuStatusTypes.payment_confirmed:
      return "pink";

    case PreOrderSkuStatusTypes.inventory_ordered:
      return "blue";

    case PreOrderSkuStatusTypes.inventory_dispatched:
      return "orange";

    case PreOrderSkuStatusTypes.inventory_received:
      return "green";

    case PreOrderSkuStatusTypes.cancelled:
      return "red";

    default:
      return "gray";
  }
};
