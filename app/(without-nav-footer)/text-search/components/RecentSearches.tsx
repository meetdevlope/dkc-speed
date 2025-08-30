"use client";

import Icon from "components/icon/Icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jsonParser } from "utils/helpers";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import { ROUTES } from "utils/routes";

type RecentSearchesProps = {
  onOptionClick?: () => void;
};

const RecentSearches: React.FC<RecentSearchesProps> = (props) => {
  const { onOptionClick } = props;

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const cookieValue = RecentSearchUtil.getRecentSearch();
    const parsed = jsonParser(cookieValue || "");
    setRecentSearches(Array.isArray(parsed) ? parsed : []);
  }, []);

  const handleClearSearches = () => {
    RecentSearchUtil.clearAllRecentSearches();
    setRecentSearches([]);
  };

  return (
    <>
      {Array.isArray(recentSearches) && recentSearches.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">
              RECENT SEARCHES
            </span>
            <button
              className="text-sm text-neutral-400"
              onClick={handleClearSearches}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col">
            {recentSearches.map((item, index) => (
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
                    name="history"
                    iconType="stroke"
                    size={18}
                    className="stroke-[1.3px] text-neutral-300"
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

export default RecentSearches;
