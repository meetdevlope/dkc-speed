"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: "Home" | "Shop" | "Rent" | "Sell";
  links: string[];
};

const labels: Tab[] = [
  {
    label: "Shop",
    links: ["/"],
  },
  {
    label: "Rent",
    links: ["/renting-new"],
  },
  {
    label: "Sell",
    links: ["/sell"],
  },
];

const HeaderTabs = () => {
  const pathname = usePathname();

  const isActivePath = (tab: Tab) => {
    if (tab.label === "Shop") {
      return pathname === "/" || pathname.startsWith("/products/");
    }
    return matcher(pathname, tab.links);
  };

  return (
    <div className="mx-aut flex w-full min-w-[260px] bg-neutral-500 lg:w-fit lg:bg-transparent">
      {labels.map((tab, index) => (
        <Link
          href={tab.links[0]}
          key={index}
          className={`header-tab-item relative w-1/3 rounded-sm py-2 text-center text-[13px] uppercase ${
            isActivePath(tab)
              ? "bg-transparent font-medium text-white lg:font-semibold"
              : "font-normal text-neutral-300"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

function matcher(url: string, array: string[]) {
  return array.some((path) => {
    if (path.endsWith("/")) {
      return url.startsWith(path);
    }
    return url === path;
  });
}

export default HeaderTabs;
