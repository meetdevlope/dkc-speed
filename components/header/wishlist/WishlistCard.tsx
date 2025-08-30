"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import EligiblePrice from "app/(with-nav-footer)/products/[slug]/components/EligiblePrice";
import AddToCartButton from "app/(with-nav-footer)/products/components/add-to-cart/AddToCartButton";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import Tooltip from "components/tooltip/Tooltip";
import { CartTypeEnum } from "enums/cartType.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import { useWishlist } from "hooks/useWishlist";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "store/auth";
import { useWishlistCount } from "store/wishlistCount";
import { getSizeFromOptions } from "utils/helpers";
import { ROUTES } from "utils/routes";
import WishlistCardSkeleton from "./WishlistCardSkeleton";
import { Product } from "types/product.types";

type WishlistCardProps = {
  skuId: string;
  token: string;
  deviceId: string;
};

const WishlistCard: React.FC<WishlistCardProps> = (props) => {
  const { skuId, token, deviceId } = props;
  const isAuthenticated = useAuthStore().isAuthenticated;
  const pathname = usePathname();
  const router = useRouter();

  const { data: productDetails, isLoading: isLoadingProducts } = useQuery({
    queryKey: [`get-product-details-${skuId}`],
    queryFn: () => getProductDetails(token, skuId),
    enabled: Boolean(skuId),
  });

  const { name, totalPrice, sellingPrice, photos, options, productStatus } =
    productDetails || {};

  const size = getSizeFromOptions(options);
  const removeItem = useWishlistCount().removeUserWishlist;
  const { updateWishlist } = useWishlist(token);

  const { mutateAsync: updateCartMutation } = useMutation({
    mutationFn: updateWishlist,
    onSuccess: (isAdded) => {
      if (!isAdded) {
        removeItem(skuId);
      } else {
        toast.error("Item is no longer available in the cart");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(
        error.message || "Could not remove item from wishlist. Try again!",
      );
    },
  });

  const handleRemoveClick = () => {
    if (isAuthenticated) {
      updateCartMutation(skuId);
    } else {
      const redirectTo = encodeURIComponent(pathname);
      router.push(`/login?redirectTo=${redirectTo}`);
    }
  };

  const onCardClick = () => {
    router.push(ROUTES.PRODUCTS.SLUG(skuId));
  };

  const isDisabled =
    productStatus === ProductStatusTypes.rented ||
    productStatus === ProductStatusTypes.sold;

  return (
    <>
      {!isLoadingProducts ? (
        <div>
          <div className="flex items-start gap-2">
            <div
              className="relative aspect-3/4 min-w-16 md:min-w-20"
              onClick={onCardClick}
            >
              <ImageComponent
                alt={`${name}-alt`}
                src={photos?.[0] || ""}
                fill
                className="rounded-sm"
              />
            </div>
            <div className="flex w-full flex-col py-2" onClick={onCardClick}>
              <h6 className="one-lines-ellipsis font-medium">{name}</h6>
              <div className="mt-1 cursor-pointer gap-4 px-1">
                <div onClick={onCardClick}>
                  {size && (
                    <p className="my-1 text-neutral-400">
                      Size: <span className="capitalize">{size}</span>
                    </p>
                  )}
                  <EligiblePrice
                    skuId={skuId}
                    originalPrice={totalPrice || 0}
                    sellingPrice={sellingPrice || 0}
                    showPriceWithSelling
                  />
                </div>
              </div>
            </div>
            <div className="mt-1 flex flex-col items-stretch gap-4">
              <Tooltip content={"Remove from cart"}>
                <button
                  className="fall cursor-pointer self-end rounded-full bg-neutral-50 p-1 transition-all hover:bg-neutral-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveClick();
                  }}
                >
                  <Icon
                    name="close"
                    className="stroke-[1.3px]"
                    iconType="stroke"
                    size={20}
                  />
                </button>
              </Tooltip>
              <AddToCartButton
                deviceId={deviceId || ""}
                token={token || ""}
                cartType={CartTypeEnum.product_purchase}
                skuId={skuId}
                disabled={isDisabled}
                disableMessage="Not available"
                price={sellingPrice}
                moveToCart
                onAddToCartSuccess={handleRemoveClick}
                originalPrice={totalPrice}
                className="!w-full"
                image={photos?.[0] || ""}
                name={name || ""}
                options={options as Product["options"]}
              />
            </div>
          </div>
        </div>
      ) : (
        <WishlistCardSkeleton />
      )}
    </>
  );
};

export default WishlistCard;
