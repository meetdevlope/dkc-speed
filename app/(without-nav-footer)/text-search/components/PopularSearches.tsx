import Icon from "components/icon/Icon";
import Link from "next/link";
import React from "react";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import { ROUTES } from "utils/routes";

type PopularSearchesProps = {
  popularSearches: string[];
  onOptionClick?: () => void;
};

const PopularSearches: React.FC<PopularSearchesProps> = (props) => {
  const { popularSearches, onOptionClick } = props;

  return (
    <>
      {Array.isArray(popularSearches) && popularSearches.length > 0 && (
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-neutral-400">
            POPULAR SEARCHES
          </span>
          <div className="flex flex-col">
            {popularSearches?.slice(0, 5)?.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  if (onOptionClick) {
                    onOptionClick();
                  }
                  RecentSearchUtil.storeRecentlySearched(item);
                }}
              >
                <Link
                  href={ROUTES.PRODUCTS.ROOT + "?search=" + item}
                  className="flex items-center gap-3 rounded p-2 hover:bg-neutral-50"
                >
                  <Icon
                    name="trending"
                    iconType="stroke"
                    size={18}
                    className="stroke-[1.4px] text-neutral-300"
                  />
                  <span className="truncate">{item}</span>
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularSearches;
