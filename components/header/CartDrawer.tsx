"use client";

import { useQuery } from "@tanstack/react-query";
import Badge from "components/Badge";
import { Button } from "components/Button";
import CartTotal from "components/cart/CartTotal";
import Divider from "components/Divider";
import Icon from "components/icon/Icon";
import BagCartItem from "components/product-display/BagCartItem";
import ProductCartItem from "components/product-display/ProductCartItem";
import { CartTypeEnum } from "enums/cartType.enum";
import { useGetCartQuery } from "hooks/queries/useGetCartQuery";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "store/auth";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";
import { BagCart, Cart, ProductCart } from "types/cart.types";
import { UserWithTotalCartItems } from "types/user.types";
import { checkIsAuthenticated } from "utils/checkIsAuthenticated";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getUser } from "utils/getUser";
import { ROUTES } from "utils/routes";
import Drawer from "../Drawer";
import IconButton from "../IconButton";
import { Icons } from "../Icons";

type CartDrawerProps = {
  token: string;
  deviceId: string;
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

const CartDrawer: React.FC<CartDrawerProps> = (props) => {
  const { token, deviceId } = props;
  const deviceIdClient = getDeviceIdClient();
  const deviceIdValue = deviceIdClient || deviceId;

  const { isOpen, close, open } = useToggle();

  const { isLoading: isLoadingCartData } = useGetCartQuery(
    token,
    deviceIdValue,
  );

  const cartData = useCartStore((state) => state.data);

  const { data: isAuthenticatedData } = useQuery({
    queryKey: ["check-is-authenticated"],
    queryFn: () => checkIsAuthenticated(token),
  });

  const { data: userData, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(token, deviceId),
    // enabled: isAuthenticated,
  });

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
    <div>
      <span onClick={open} className="cursor-pointer">
        <Badge content={count || 0}>
          <IconButton>
            <Icons.cart />
          </IconButton>
        </Badge>
      </span>
      <Drawer isOpen={isOpen} onClose={close} direction="right">
        <div className="flex h-dvh flex-col px-4 pt-4 pb-2">
          <div>
            <div className="flex items-center justify-between">
              <h4>CART</h4>
              <p className="text-description">{cartData?.length || 0} items</p>
            </div>
            <Divider className="my-2" />
            <div
              className="flex flex-col gap-4 overflow-y-auto"
              style={{
                maxHeight: "calc(100vh - 400px)",
              }}
            >
              {cartData?.length < 1 && (
                <div className="fall">
                  <h6>
                    {cartData && cartData?.length < 1 && "No items in cart"}
                  </h6>
                </div>
              )}
              {cartData && cartData.length > 0 && (
                <>
                  {cartData.map((item, index) => {
                    const isBagCart =
                      (item.cart as Cart)?.type === CartTypeEnum.bag;
                    const isProductCart =
                      (item.cart as Cart)?.type === CartTypeEnum.product_rent ||
                      (item.cart as Cart)?.type ===
                        CartTypeEnum.product_purchase;

                    if (isBagCart) {
                      return (
                        <BagCartItem
                          key={index}
                          type={CartTypeEnum.bag}
                          quantity={item.cart.quantity}
                          id={item.cart?._id || ""}
                          token={token}
                          deviceId={deviceId}
                          price={(item.details as BagCart).price}
                          bagType={(item.details as BagCart).type}
                          brandId={(item.details as BagCart).brandId}
                        />
                      );
                    }

                    if (isProductCart) {
                      const {
                        skuId,
                        forRent,
                        rentEndDate,
                        rentStartDate,
                        rentDays,
                      } = item.details as ProductCart;
                      return (
                        <ProductCartItem
                          key={index}
                          deviceId={deviceId}
                          token={token}
                          skuId={skuId}
                          cartId={item?.cart?._id || ""}
                          forRent={forRent}
                          rentStartDate={rentStartDate}
                          rentEndDate={rentEndDate}
                          rentDays={rentDays}
                        />
                      );
                    }
                  })}
                </>
              )}
            </div>
          </div>
          <div className="mt-auto">
            {cartData && cartData?.length > 0 && (
              <>
                <Divider className="my-4" />
                <CartTotal />
                <Link href={ROUTES.CHECKOUT}>
                  <Button
                    className="mt-3 w-full md:mt-6"
                    endIcon={
                      <Icon
                        name="chevron"
                        color="var(--neutral-400)"
                        iconType="stroke"
                        className="-rotate-90"
                        size={22}
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
      </Drawer>
    </div>
  );
};

export default CartDrawer;
