import { cookies } from "next/headers";
import { jsonParser } from "utils/helpers";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import SearchComponent from "./components/SearchComponent";

const TextSearchScreen = () => {
  const recentSearches = cookies().get(RecentSearchUtil.cookieName)?.value;
  const allRecentSearches = jsonParser(recentSearches);

  return (
    <SearchComponent
      allRecentSearches={allRecentSearches}
      popularSearches={popularSearches}
    />
  );
};

export default TextSearchScreen;

const popularSearches = ["Shirt", "Pant", "T shirt", "Shorts", "Belt"];
