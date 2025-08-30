"use client";

import { useQuery } from "@tanstack/react-query";
import Badge from "components/Badge";
import Icon from "components/icon/Icon";
import { useWishlist } from "hooks/useWishlist";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthStore } from "store/auth";
import { useWishlistCount } from "store/wishlistCount";
import { ROUTES } from "utils/routes";

type WishlistIconProps = {
  token: string;
};

const WishlistIcon: React.FC<WishlistIconProps> = (props) => {
  const { token } = props;

  const { getUserWishlists } = useWishlist(token);
  const { setUserWishlist } = useWishlistCount();
  const isAuthenticated = useAuthStore().isAuthenticated;
  const wishListItems = useWishlistCount().userWishlist;

  const { data: userWishlistData } = useQuery({
    queryKey: ["get-user-wishlist"],
    queryFn: getUserWishlists,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setUserWishlist(userWishlistData?.items || []);
  }, [setUserWishlist, userWishlistData?.items]);

  return (
    <Badge content={wishListItems?.length || 0}>
      <Link href={ROUTES.WISHLIST}>
        <Icon
          name="heart"
          iconType="stroke"
          size={20}
          className="stroke-[1.3px]"
        />
      </Link>
    </Badge>
  );
};

export default WishlistIcon;
