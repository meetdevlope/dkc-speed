import { CurrencyDisplay } from "components/CurrencyDisplay";
import React from "react";
import { Product } from "types/product.types";
import { LinkOrDiv } from "./WardrobeItem";
import { ImageComponent } from "components/image-component/ImageComponent";
import { ROUTES } from "utils/routes";
import { getSizeFromOptions } from "utils/helpers";
import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";

interface WardrobeInventoryProduct extends Product {
  allowRedirectToProductDetails: boolean;
}

const WardrobeInventoryProduct: React.FC<WardrobeInventoryProduct> = async (
  props,
) => {
  const {
    allowRedirectToProductDetails,
    photos,
    brand,
    sellingPrice,
    slug,
    name,
    options,
  } = props;

  const brandDetails = await getBrandDetails(brand || "");

  const link = ROUTES.PRODUCTS.SLUG(slug);
  const size = getSizeFromOptions(options);

  return (
    <div>
      <LinkOrDiv link={link} isLink={allowRedirectToProductDetails}>
        <div className="relative aspect-3/4 min-h-64 w-full overflow-hidden">
          <ImageComponent
            src={photos?.[0]}
            alt={name + "-image"}
            fill
            className="rounded-md"
          />
        </div>
        <div className="p-2">
          <p className="border-l-2 border-l-primary-500 pl-1 font-semibold text-primary-500 uppercase">
            {brandDetails?.name || "-"}
          </p>

          <h6 className="mt-1 truncate font-primary font-medium text-nowrap md:text-base">
            {name}
          </h6>

          <div className="mt-1 flex items-center justify-between gap-x-4">
            <h6 className="text-neutral-400">
              Size <span className="uppercase">{size}</span>
            </h6>
          </div>
        </div>
      </LinkOrDiv>

      <div className="flex items-center p-2">
        <LinkOrDiv
          link={link}
          isLink={allowRedirectToProductDetails}
          classname="w-full"
        >
          <CurrencyDisplay
            className="font-secondary text-base font-medium"
            amount={sellingPrice}
          />
        </LinkOrDiv>
      </div>
    </div>
  );
};

export default WardrobeInventoryProduct;
