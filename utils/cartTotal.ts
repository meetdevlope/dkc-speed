import { totalDepositKey } from "components/cart/CartTotal";
import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import { BagCart, CartResponse, ProductCart } from "types/cart.types";
import { DiscountResponse } from "types/product.types";

export interface ExtraChargesModel {
  label: string;
  amount: number;
  isPercentage: boolean;
}

export interface CartModel {
  type: CartTypeEnum;
  cartRefId: string;
  quantity: number;
}

export interface BagCartModel {
  brandId: string;
  type: BagCartEnum;
  price: number;
  image: string;
  userId: string;
  userDeviceId: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface UIConfig {
  pricePerBag: number;
}

class TotalFormattingModal {
  total: number;
  extraChargeAmount: number;
  extraChargeAmountWithoutDeposit: number;
  subTotal: number;
  totalAddition: number;
  totalSubtraction: number;
  paymentDestructure: Record<string, number>;
  paymentDestructureWithOutSubTotal: Record<string, number>;

  constructor(
    total: number,
    extraChargeAmount: number,
    extraChargeAmountWithoutDeposit: number,
    subTotal: number,
    totalAddition: number,
    totalSubtraction: number,
    paymentDestructure: Record<string, number>,
    paymentDestructureWithOutSubTotal: Record<string, number>,
  ) {
    this.total = total;
    this.extraChargeAmount = extraChargeAmount;
    this.extraChargeAmountWithoutDeposit = extraChargeAmountWithoutDeposit;
    this.subTotal = subTotal;
    this.totalAddition = totalAddition;
    this.totalSubtraction = totalSubtraction;
    this.paymentDestructure = paymentDestructure;
    this.paymentDestructureWithOutSubTotal = paymentDestructureWithOutSubTotal;
  }
}

class CartUtils {
  static getCharges(
    cartList: CartResponse[],
    // bagCartMap: Record<string, BagCartModel>,
    // uiConfig: UIConfig,
    extraCharges: ExtraChargesModel[],
    discountModel: DiscountResponse,
    shipment: number,
  ): TotalFormattingModal {
    let subTotal = 0.0;
    let discountTotal = 0.0;
    let extraChargeAmount = 0.0;
    let extraChargeAmountWithoutDeposit = 0.0;
    const labels: Record<string, number> = {};
    const labelsWithoutSubtotal: Record<string, number> = {};

    cartList.forEach((element) => {
      if (element.details) {
        if (element.cart.type === CartTypeEnum.bag) {
          subTotal +=
            (element.details as BagCart).price * element.cart.quantity;
        } else if (
          element.cart.type === CartTypeEnum.product_purchase ||
          element.cart.type === CartTypeEnum.product_rent
        ) {
          const nDiscount =
            discountModel?.discountMap?.[
              (element.details as ProductCart)?.skuId
            ] || 0;
          const cDiscount =
            (element.details as ProductCart).originalPrice -
            (element.details as ProductCart).price;
          if (nDiscount > 0) {
            discountTotal -= nDiscount;
            subTotal += (element.details as ProductCart).price;
          } else if (cDiscount > 0) {
            discountTotal -= cDiscount;
            subTotal += (element.details as ProductCart).originalPrice;
          } else {
            subTotal += (element.details as ProductCart).originalPrice;
          }
        }
      }
    });

    labels["Sub Total"] = subTotal;
    labels["Discount"] = Number(discountTotal.toFixed(2));
    labels["Shipment"] = shipment;
    labelsWithoutSubtotal["Shipment"] = shipment;

    const afterDiscountPrice = subTotal + discountTotal;

    extraCharges.forEach((element) => {
      const amount = element.isPercentage
        ? (afterDiscountPrice * element.amount) / 100
        : element.amount;
      labels[element.label] = amount;
      extraChargeAmount += amount;
      if (element.label !== totalDepositKey) {
        extraChargeAmountWithoutDeposit += amount;
      }
      labelsWithoutSubtotal[element.label] = amount;
    });

    if (shipment && shipment > 0) {
      extraChargeAmount += shipment;
      extraChargeAmountWithoutDeposit += shipment;
    }

    const [totalAddition, totalDeletion] = Object.values(
      labelsWithoutSubtotal,
    ).reduce(
      (prev, e) => {
        let [addition, deletion] = prev;
        if (e >= 0) {
          addition += e;
        } else {
          deletion += e;
        }
        return [addition, deletion];
      },
      [0.0, 0.0],
    );

    const total = Object.values(labels).reduce(
      (previousValue, element) => previousValue + element,
      0.0,
    );

    return new TotalFormattingModal(
      total,
      extraChargeAmount,
      extraChargeAmountWithoutDeposit,
      subTotal,
      totalAddition,
      totalDeletion,
      labels,
      labelsWithoutSubtotal,
    );
  }
}

export default CartUtils;
