import Link from "next/link";
import React from "react";
import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";
import { getCategory } from "app/(with-nav-footer)/category/[slug]/action";
import { ROUTES } from "utils/routes";

type SellerInfoProps = {
  seller: string;
  category: string;
  brand: string;
};

const SellerInfo: React.FC<SellerInfoProps> = async (props) => {
  const { category, seller, brand } = props;

  const brandDetails = await getBrandDetails(brand || "");
  const categoryDetails = await getCategory(category || "");

  const { name: brandName } = brandDetails || {};
  const { name: categoryName } = categoryDetails || {};

  return (
    <div className="my-2 font-semibold">
      {categoryDetails && (
        <Link
          href={ROUTES.PRODUCTS.ROOT + "?category=" + category}
          className="font-primary text-base font-medium capitalize underline opacity-80"
        >
          {categoryName}
        </Link>
      )}{" "}
      {brandName && categoryName && <span className="font-normal">by </span>}
      {brandName && (
        <Link
          href={ROUTES.PRODUCTS.ROOT + "?brand=" + brand}
          className="text-base font-medium capitalize underline"
        >
          {brandName}
        </Link>
      )}
      <div className="mt-2">
        {seller && (
          <Link
            href={ROUTES.PRODUCTS.ROOT + "?seller=" + seller}
            className="text-sm capitalize underline opacity-80 transition-all hover:font-medium"
          >
            Shop more from this seller
          </Link>
        )}
      </div>
    </div>
  );
};

export default SellerInfo;
