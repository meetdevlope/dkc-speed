"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "components/Button";
import WishlistCard from "components/header/wishlist/WishlistCard";
import WishlistCardSkeleton from "components/header/wishlist/WishlistCardSkeleton";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import { useWishlist } from "hooks/useWishlist";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthStore } from "store/auth";
import { useWishlistCount } from "store/wishlistCount";

type WishlistMainProps = {
  token: string;
  deviceIdValue: string;
};

const WishlistMain: React.FC<WishlistMainProps> = (props) => {
  const { token, deviceIdValue } = props;

  const { getUserWishlists } = useWishlist(token);
  const { setUserWishlist } = useWishlistCount();
  const isAuthenticated = useAuthStore().isAuthenticated;

  const { data: userWishlistData, isPending } = useQuery({
    queryKey: ["get-user-wishlist"],
    queryFn: getUserWishlists,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (userWishlistData?.items) {
      setUserWishlist(userWishlistData?.items || []);
    }
  }, [setUserWishlist, userWishlistData?.items]);

  const wishListItems = useWishlistCount().userWishlist;

  return (
    <div className="bg-neutral-50">
      <PageHeader>
        <div className="flex w-full items-center justify-between">
          <h6 className="font-medium">Wishlist</h6>
          {isPending ? (
            <div className="shimmer-loading h-5 w-[68px] rounded" />
          ) : (
            <span className="pr-4 text-neutral-400">
              {Array.isArray(wishListItems) && (
                <>
                  {wishListItems?.length} item
                  {wishListItems?.length > 1 && "s"}{" "}
                </>
              )}
            </span>
          )}
        </div>
      </PageHeader>
      <MaxWidthWrapper>
        <div className="bg-neutral-50 p-4 md:py-6 lg:py-8">
          {Array.isArray(wishListItems) && wishListItems?.length > 0 && (
            <div
              className={`grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 md:gap-y-4`}
            >
              {wishListItems?.map((item, index) => (
                <div key={index} className="rounded-xl bg-white p-2 shadow-2xs">
                  <WishlistCard
                    skuId={item}
                    token={token || ""}
                    deviceId={deviceIdValue || ""}
                  />
                </div>
              ))}
            </div>
          )}
          {isPending && (
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
              {Array(2)
                .fill(null)
                .map((i) => (
                  <WishlistCardSkeleton key={i} />
                ))}
            </div>
          )}
          {!isPending &&
            Array.isArray(wishListItems) &&
            wishListItems?.length < 1 && (
              <div className={`fall w-full flex-col gap-y-4`}>
                <h6 className="mt-4">Your wishlist is empty</h6>
                <Link href={"/"}>
                  <Button size="md">Continue Shopping</Button>
                </Link>
              </div>
            )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default WishlistMain;
