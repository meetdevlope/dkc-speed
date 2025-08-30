"use client";

import { useQuery } from "@tanstack/react-query";
import Badge from "components/Badge";
import Icon from "components/icon/Icon";
import { useGetCartQuery } from "hooks/queries/useGetCartQuery";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useAuthStore } from "store/auth";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";
import { UserWithTotalCartItems } from "types/user.types";
import { checkIsAuthenticated } from "utils/checkIsAuthenticated";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getUser } from "utils/getUser";
import { ROUTES } from "utils/routes";

type CartIconProps = {
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

const CartIcon: React.FC<CartIconProps> = (props) => {
  const { token, deviceId } = props;

  const deviceIdClient = getDeviceIdClient();
  const deviceIdValue = deviceIdClient || deviceId;

  const { isLoading: isLoadingCartData } = useGetCartQuery(
    token,
    deviceIdValue,
  );

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
    <Badge content={count || 0}>
      <Link href={ROUTES.CART}>
        <Icon
          name="cart"
          iconType="stroke"
          size={22}
          className="stroke-[1.2px]"
        />
      </Link>
    </Badge>
  );
};

export default CartIcon;
