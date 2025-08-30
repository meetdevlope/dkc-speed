import Link from "next/link";
import React from "react";

export type BreadcrumbTypes = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbTypes[];
  showInMobile?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { breadcrumbs, showInMobile = false } = props;

  return (
    <ol
      className={`${
        showInMobile ? "flex items-center" : "hidden sm:flex"
      } mx-2 h-12 space-x-1 text-gray-600`}
    >
      {/* <BackButton noBorder /> */}
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mr-1 text-[10px] text-neutral-400/70">/</span>
            )}
            <Link
              href={breadcrumb.href}
              className={`hover:text-primary1 max-w-36 truncate text-xs md:text-sm xl:max-w-none ${breadcrumbs.length === index + 1 ? "font-medium text-neutral-400" : "text-neutral-400/70"}`}
            >
              {breadcrumb.label}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumbs;
