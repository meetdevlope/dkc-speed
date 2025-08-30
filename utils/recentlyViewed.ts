export class RVUtil {
  static cookieName = "dk-rv";

  // Get the recently viewed items cookie
  static getRV(): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${RVUtil.cookieName}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  // Set the recently viewed items cookie with an expiration time
  static setRV(value: string, days: number = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiry date
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${RVUtil.cookieName}=${value}; ${expires}; path=/`;
  }

  // Store productId in the recently viewed items cookie
  static storeRecentlyViewedItems(productId: string) {
    const recentlyViewedItems = RVUtil.getRV();

    let productIds: string[] = [];

    // Parse the cookie if it exists
    if (recentlyViewedItems) {
      try {
        productIds = JSON.parse(recentlyViewedItems);
        if (!Array.isArray(productIds)) {
          productIds = [];
        }
      } catch (error) {
        console.error("Error parsing recently viewed items cookie:", error);
        productIds = [];
      }
    }

    // If the product ID is already in the array, remove it to re-add it at the end (making it the most recent)
    productIds = productIds.filter((id) => id !== productId);

    // Add the current productId to the start of the array
    productIds.unshift(productId);

    // If the array exceeds 10, remove the oldest productId (first element)
    if (productIds.length > 10) {
      productIds.pop();
    }

    // Store the updated productIds in the cookies
    RVUtil.setRV(JSON.stringify(productIds));
  }
}
