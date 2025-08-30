import ProductSliderGallery from "app/(with-nav-footer)/products/[slug]/components/image-gallery/ProductSliderGallery";
import AddToCartButton from "app/(with-nav-footer)/products/components/add-to-cart/AddToCartButton";
import RentWithAddToCart from "app/(with-nav-footer)/products/components/rent-with-add-to-cart/RentWithAddToCart";
import { CartTypeEnum } from "enums/cartType.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import React from "react";
import { Product } from "types/product.types";
import SetRecentlyViewed from "app/(with-nav-footer)/products/components/recently-viewed/SetRecentlyViewed";
import ProductAuthenticated from "app/(with-nav-footer)/products/[slug]/components/ProductAuthenticated";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { getSizeFromOptions } from "utils/helpers";
import { CurrencyDisplay } from "components/CurrencyDisplay";

type QuickViewContentProps = {
  productDetails: Product;
  skuId: string;
  deviceId: string;
  token: string;
  direction?: "vertical" | "horizontal";
};

const QuickViewContent: React.FC<QuickViewContentProps> = (props) => {
  const { productDetails, deviceId, skuId, token, direction } = props;
  const {
    photos,
    name,
    sellingPrice,
    totalPrice,
    eligibleForRent,
    productStatus,
    rentDiscountType,
    rentPriceDistribution,
    rentPrice,
    _id,
    authenticationId,
    options,
    certificateUrl,
    slug,
  } = productDetails || {};

  const isVertical = direction === "vertical";

  const size = getSizeFromOptions(options);

  return (
    <div
      className={`flex items-start gap-1 md:gap-12 ${isVertical ? "flex-col" : "flex-row pb-4"}`}
    >
      <div
        className={`mx-auto aspect-3/4 ${isVertical ? "w-[80% mb-8 h-[40dvh] max-h-[50dvh] max-w-[280px]" : "w-[40%]"}`}
      >
        <ProductSliderGallery images={photos || []} />
      </div>
      <div className={`h-full ${isVertical ? "w-full" : "w-[60%]"} px-2 py-4`}>
        {authenticationId && (
          <ProductAuthenticated className="mb-2" url={certificateUrl} />
        )}
        <h3 className="two-lines-ellipsis text-base lg:text-xl"> {name} </h3>
        <div className="my-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CurrencyDisplay
              className="font-secondary text-xl lg:text-2xl"
              amount={sellingPrice}
            />
            {totalPrice && (
              <CurrencyDisplay
                amount={totalPrice}
                className="font-secondary font-medium text-neutral-400 line-through opacity-60"
              />
            )}
          </div>
          {size && (
            <h6 className="text-description">
              Size: <span className="uppercase"> {size} </span>
            </h6>
          )}
        </div>
        <div className="fall">
          <Link
            href={ROUTES.PRODUCTS.SLUG(slug)}
            className="mx-auto my-2 inline-block text-center uppercase underline md:mt-auto"
          >
            {" "}
            View details{" "}
          </Link>
        </div>
        <div className="mt-2 pb-safe">
          {eligibleForRent ? (
            <RentWithAddToCart
              price={sellingPrice}
              deviceId={deviceId || ""}
              token={token || ""}
              skuId={skuId}
              rentDiscountType={rentDiscountType}
              rentPrice={rentPrice}
              rentPriceDistribution={rentPriceDistribution}
              originalPrice={totalPrice}
              productId={_id}
              disabled={productStatus !== ProductStatusTypes.available}
              disableMessage="Unavailable"
              image={photos?.[0] || ""}
              name={name}
              options={options}
            />
          ) : (
            <AddToCartButton
              deviceId={deviceId || ""}
              token={token || ""}
              cartType={CartTypeEnum.product_purchase}
              skuId={skuId}
              disabled={
                productStatus === ProductStatusTypes.rented ||
                productStatus === ProductStatusTypes.sold
              }
              disableMessage="Unavailable"
              price={sellingPrice}
              originalPrice={totalPrice}
              image={photos?.[0] || ""}
              name={name}
              options={options}
            />
          )}
        </div>
      </div>
      <SetRecentlyViewed productId={skuId} />
    </div>
  );
};

export default QuickViewContent;
