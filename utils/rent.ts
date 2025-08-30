import { CartTypeEnum } from "enums/cartType.enum";
import { DiscountTypeEnum } from "enums/discountType.enum";
import { CartResponse, ProductCart } from "types/cart.types";
import { GetRentRequestTypes } from "types/rent.types";

export class RentUtils {
  static getRentTotal(data: GetRentRequestTypes) {
    const tempPrice = Number(data.perDayPrice) * Number(data.days);
    if (data.discount) {
      if (data.discountType === DiscountTypeEnum.percentage) {
        const minusPrice = (Number(data.discount) * tempPrice) / 100;
        const finalPrice = tempPrice - minusPrice;
        return finalPrice < 0 ? `FREE` : finalPrice;
      } else if (data.discountType === DiscountTypeEnum.fixed) {
        const finalPrice = tempPrice - Number(data.discount);
        return finalPrice < 0 ? `FREE` : finalPrice;
      }
      return tempPrice;
    } else {
      return tempPrice;
    }
  }

  static getRentTotalDigits(data: GetRentRequestTypes) {
    const tempPrice = Number(data.perDayPrice) * Number(data.days);
    if (data.discountType === DiscountTypeEnum.percentage) {
      const minusPrice = (Number(data.discount) * tempPrice) / 100;
      const finalPrice = tempPrice - minusPrice;
      return finalPrice < 0 ? 0 : finalPrice;
    } else if (data.discountType === DiscountTypeEnum.fixed) {
      const finalPrice = tempPrice - Number(data.discount);
      return finalPrice < 0 ? 0 : finalPrice;
    }
    return tempPrice;
  }

  static getRentOriginalPrice(perDayPrice: number, days: number) {
    const finalOriginalPrice = Number(perDayPrice) * Number(days);
    return finalOriginalPrice;
  }
  static getTotalDeposit(cartResponse: CartResponse[]): number {
    return cartResponse?.reduce((total, cartItem) => {
      if (
        cartItem.cart.type === CartTypeEnum.product_rent &&
        cartItem.details &&
        "depositAmount" in cartItem.details
      ) {
        const product = cartItem.details as ProductCart;
        total += product.depositAmount;
      }
      return total;
    }, 0);
  }
}
