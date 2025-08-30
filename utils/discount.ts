export class DiscountUtil {
  static getBestPrice(discountPrice: number, sellingPrice: number) {
    if (discountPrice) {
      const subtractedPrice = Number(sellingPrice) - Number(discountPrice);
      const checkNegativePrice =
        Number(discountPrice) < 1 ? 0 : subtractedPrice;

      const finalPrice = checkNegativePrice === 0 ? "FREE" : checkNegativePrice;

      return finalPrice;
    }
    return sellingPrice;
  }

  static getBestPriceDigits(discountPrice: number, sellingPrice: number) {
    if (discountPrice) {
      const subtractedPrice = Number(sellingPrice) - Number(discountPrice);
      const checkNegativePrice =
        Number(discountPrice) < 1 ? 0 : subtractedPrice;

      return Number(checkNegativePrice);
    }
    return Number(sellingPrice);
  }
}
