import Link from "next/link";
import React, { ReactNode } from "react";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import Chip from "../Chip";
import AddToWishlist from "./AddToWishlist";
import QuickView from "./quick-view/QuickView";
import { getDeviceId } from "utils/getDKCDeviceId";
import ProductBadge from "./badge/ProductBadge";
import { ImageComponent } from "components/image-component/ImageComponent";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { cn } from "utils/helpers";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";

type ProductCardProps = {
  name: string;
  image: string;
  price: string | number;
  originalPrice?: string | number;
  size: string | number | null;
  eligibleForRent?: boolean;
  noQuickView?: boolean;
  slug: string;
  skuId: string;
  noLink?: boolean;
  wishlistNumber?: number;
  productId: string;
  maxWidth?: number;
  rentPrice?: number;
  productStatus?: ProductStatusTypes;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const {
    image,
    name,
    price,
    size,
    originalPrice,
    eligibleForRent,
    noQuickView,
    slug,
    noLink = false,
    skuId,
    wishlistNumber = 0,
    maxWidth,
    productId,
    rentPrice = 0,
    productStatus,
  } = props;

  const token = getToken();

  const LinkProvider = ({ children }: { children: ReactNode }) => {
    if (noLink) return children;
    else return <Link href={ROUTES.PRODUCTS.SLUG(slug)}> {children} </Link>;
  };

  const deviceId = getDeviceId();

  const isSoldOut = productStatus === ProductStatusTypes.sold;
  const isRented = productStatus === ProductStatusTypes.rented;

  return (
    <div className={cn("relative")}>
      {isSoldOut && (
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white px-1 py-0.5 shadow-md">
          <h6 className="font-normal text-nowrap">Out of stock</h6>
        </div>
      )}
      {isRented && (
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white px-1 py-0.5 shadow-md">
          <h6 className="font-normal text-nowrap">On Rent</h6>
        </div>
      )}
      <div
        className={cn(
          "flex w-full flex-col",
          (isSoldOut || isRented) && "opacity-20",
        )}
        style={{
          maxWidth: maxWidth ? maxWidth : "",
        }}
      >
        <div className={`relative aspect-3/4 min-h-64 w-full overflow-hidden`}>
          <LinkProvider>
            <ImageComponent
              src={image}
              alt={name + "-image"}
              fill
              className="rounded-md"
            />
          </LinkProvider>
          <ProductBadge productId={productId} />
          <div
            className={`absolute top-1.5 right-2 flex items-center justify-end gap-0.5 md:top-1.5`}
          >
            <AddToWishlist
              wishlistNumber={wishlistNumber}
              skuId={skuId}
              token={token || ""}
            />
          </div>
          {!noQuickView && (
            <QuickView
              deviceId={deviceId || ""}
              skuId={skuId}
              slug={slug}
              token={token || ""}
            />
          )}
        </div>
        <LinkProvider>
          <div className="mx-1 mt-2">
            <h6 className="truncate font-primary font-medium text-nowrap md:text-base">
              {name}
            </h6>

            <div className="my-1 flex items-center justify-between gap-x-2">
              {size && (
                <h6 className="text-neutral-400">
                  Size <span className="uppercase"> {size} </span>
                </h6>
              )}
              {eligibleForRent && <Chip label="Rent" color="red" />}
            </div>

            <div className="mt-1 flex items-center gap-2">
              <CurrencyDisplay
                className="font-secondary text-base font-medium"
                amount={price}
              />
              {!eligibleForRent &&
                originalPrice &&
                Number(originalPrice) > 0 &&
                Number(originalPrice) > Number(price) && (
                  <CurrencyDisplay
                    className="font-secondary font-normal text-neutral-400/70 line-through"
                    amount={originalPrice}
                  />
                )}
              {rentPrice > 0 && (
                <div className="ml-auto flex items-center gap-x-1">
                  <p className="text-neutral-400">Rent</p>
                  <CurrencyDisplay
                    className="font-secondary font-normal text-neutral-500"
                    amount={rentPrice}
                  />
                  <p className="text-neutral-400">/D</p>
                </div>
              )}
            </div>
          </div>
        </LinkProvider>
      </div>
    </div>
  );
};

export default ProductCard;
