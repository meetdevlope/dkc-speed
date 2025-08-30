"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "components/Button";
import CartTotal from "components/cart/CartTotal";
import Divider from "components/Divider";
import WishlistCard from "components/header/wishlist/WishlistCard";
import WishlistCardSkeleton from "components/header/wishlist/WishlistCardSkeleton";
import Icon from "components/icon/Icon";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import ProductDisplay from "components/product-display/ProductDisplay";
import { useGetCartQuery } from "hooks/queries/useGetCartQuery";
import { useCartUIConfigLoader } from "hooks/useCartConfig";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useAuthStore } from "store/auth";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";
import { useWishlistCount } from "store/wishlistCount";
import { ProductCart } from "types/cart.types";
import { UserWithTotalCartItems } from "types/user.types";
import { checkIsAuthenticated } from "utils/checkIsAuthenticated";
import { getUser } from "utils/getUser";
import { PRE_ORDER_TIME_TEXT } from "utils/helpers";
import { ROUTES } from "utils/routes";

type CartMainProps = {
  token: string;
  deviceIdValue: string;
};

const setCartCount = (cartValue: number) => {
  useCartCount.setState({ cartCount: cartValue });
};
const setIsCartLoading = (isLoadingCart: boolean) => {
  useCartStore.setState({ loadingCart: isLoadingCart });
};
const setIsAuthenticated = (val: boolean) => {
  useAuthStore.setState({ isAuthenticated: val });
};
const setUserData = (user: UserWithTotalCartItems | undefined) => {
  useAuthStore.setState({ user });
};

const CartMain: React.FC<CartMainProps> = (props) => {
  const { deviceIdValue, token } = props;

  const { isPending: isLoadingCartData } = useGetCartQuery(
    token,
    deviceIdValue,
  );

  const { error: cartConfigError, isPending: isCartConfigLoading } =
    useCartUIConfigLoader();

  const { data: isAuthenticatedData } = useQuery({
    queryKey: ["check-is-authenticated"],
    queryFn: () => checkIsAuthenticated(token),
  });

  const { data: userData, isPending: isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(token, deviceIdValue),
    // enabled: isAuthenticated,
  });

  const cartData = useCartStore((state) => state.data);
  const wishListItems = useWishlistCount().userWishlist;

  useEffect(() => {
    setIsCartLoading(isLoading || isLoadingCartData);
  }, [isLoading, isLoadingCartData]);

  const count = useCartCount((state) => state.cartCount);
  const cartCount = useMemo(
    () => Number(userData?.totalCartItems) || 0,
    [userData],
  );

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  useEffect(() => {
    setCartCount(cartCount);
  }, [cartCount, userData]);

  useEffect(() => {
    setIsAuthenticated(Boolean(isAuthenticatedData));
  }, [cartCount, isAuthenticatedData, userData]);

  return (
    <div className="bg-neutral-50 pb-6">
      <PageHeader
        endElement={
          <div className="ml-auto">
            {isLoading ? (
              <div className="shimmer-loading h-5 w-[68px] rounded" />
            ) : (
              <span className="pr-4 text-neutral-400">
                {count} item{count > 1 && "s"}
              </span>
            )}
          </div>
        }
      >
        <h6 className="font-medium lg:text-base">Cart</h6>
      </PageHeader>
      <MaxWidthWrapper>
        <div className="mt-1 p-2 md:my-4">
          {Array.isArray(cartData) && cartData?.length > 0 && (
            <div className="flex items-start gap-x-4">
              <div
                className={`grid w-full grid-cols-1 gap-x-6 gap-y-2 md:gap-y-4 lg:w-[60%]`}
              >
                {cartData?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white p-2 shadow-2xs"
                  >
                    <ProductDisplay
                      cartData={item}
                      deviceId={deviceIdValue}
                      token={token}
                    />
                    {(item?.details as ProductCart)?.skuId?.includes("PO") && (
                      <div className="fall mt-4 rounded-lg bg-blue-light p-2">
                        <p className="text-center font-medium capitalize">
                          {PRE_ORDER_TIME_TEXT}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="hidden w-[40%] rounded-xl bg-white p-4 shadow-sm lg:block">
                {cartData && cartData?.length > 0 && (
                  <>
                    <CartTotal
                      isLoading={isCartConfigLoading}
                      isError={cartConfigError?.message}
                    />
                    <Link href={ROUTES.CHECKOUT}>
                      <Button
                        className="mt-3 w-full md:mt-6"
                        disabled={isCartConfigLoading}
                        endIcon={
                          <Icon
                            name="chevron"
                            iconType="stroke"
                            className="-rotate-90"
                          />
                        }
                      >
                        Checkout
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
          <div>
            {!isLoadingCartData &&
              Array.isArray(cartData) &&
              cartData?.length < 1 && (
                <div className={`fall w-full flex-col gap-y-4`}>
                  <h6 className="mt-4">Your bag is empty</h6>
                  <Link href={"/"}>
                    <Button size="md">Continue Shopping</Button>
                  </Link>
                </div>
              )}
          </div>
          {isLoadingCartData && (
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
              {Array(4)
                .fill(null)
                .map((i) => (
                  <WishlistCardSkeleton key={i} />
                ))}
            </div>
          )}
          {Array.isArray(wishListItems) && wishListItems?.length > 0 && (
            <div className="my-4 rounded-xl bg-white p-4 md:my-8 lg:my-10">
              <h6 className="mb-6 font-medium md:text-base">Your wishlist</h6>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {wishListItems?.map((item, index) => (
                  <div
                    key={index}
                    className="lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-neutral-50/20 lg:p-2"
                  >
                    <WishlistCard
                      skuId={item}
                      token={token || ""}
                      deviceId={deviceIdValue || ""}
                    />
                    {wishListItems?.length !== index + 1 && (
                      <Divider className="my-2 block bg-neutral-50 lg:hidden" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="block p-4 lg:hidden">
          {cartData && cartData?.length > 0 && (
            <>
              <CartTotal
                isLoading={isCartConfigLoading}
                isError={cartConfigError?.message}
              />
              <Link href={ROUTES.CHECKOUT}>
                <Button
                  className="mt-3 w-full md:mt-6"
                  endIcon={
                    <Icon
                      name="chevron"
                      iconType="stroke"
                      className="-rotate-90"
                    />
                  }
                >
                  Checkout
                </Button>
              </Link>
            </>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default CartMain;
