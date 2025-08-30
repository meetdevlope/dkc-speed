import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";

const ProductValuationCard = () => {
  return (
    <div className="my-12 w-full rounded-xl border border-primary-200 bg-primary-light/30 p-8 transition-all duration-300">
      <div className="flex flex-col items-center justify-between gap-y-12 md:flex-row">
        <div className="flex flex-col items-center space-x-6 gap-y-6 md:flex-row">
          <div className="relative flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary-200 bg-primary-light">
              <Icon name="image-search" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
              <Icon name="sparkles" iconType="stroke" size={16} />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-center text-gray-900 md:text-left">
              AI Product Valuation
            </h2>
            <p className="max-w-lg text-center text-gray-600 md:text-left">
              Get an instant AI-powered valuation of your preloved items. Simply
              upload a photo and let our smart technology do the rest.
            </p>
          </div>
        </div>
        <Link href={ROUTES.PRODUCT_VALUATION}>
          <Button size="md">Start Valuation</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductValuationCard;
