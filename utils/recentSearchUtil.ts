export class RecentSearchUtil {
  static cookieName = "dk-recent-searches";

  static getRecentSearch(): string | null {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${RecentSearchUtil.cookieName}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }

  static setRecentSearch(value: string, days: number = 15) {
    if (typeof document === "undefined") return null;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiry date
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${RecentSearchUtil.cookieName}=${value}; ${expires}; path=/`;
  }

  static storeRecentlySearched(search: string) {
    const recentlySearchedItems = RecentSearchUtil.getRecentSearch();

    let recentSearches: string[] = [];

    // Parse the cookie if it exists
    if (recentlySearchedItems) {
      try {
        recentSearches = JSON.parse(recentlySearchedItems);
        if (!Array.isArray(recentSearches)) {
          recentSearches = [];
        }
      } catch (error) {
        console.error("Error parsing recently viewed items cookie:", error);
        recentSearches = [];
      }
    }

    recentSearches = recentSearches.filter((id) => id !== search);
    recentSearches.unshift(search);

    if (recentSearches.length > 5) {
      recentSearches.pop();
    }

    RecentSearchUtil.setRecentSearch(JSON.stringify(recentSearches));
  }

  static clearAllRecentSearches() {
    if (typeof document === "undefined") return null;
    document.cookie = `${RecentSearchUtil.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
