"use client";

import { useQuery } from "@tanstack/react-query";
import Badge from "components/Badge";
import Divider from "components/Divider";
import Drawer from "components/Drawer";
import IconButton from "components/IconButton";
import { Icons } from "components/Icons";
import { useToggle } from "hooks/useToggle";
import { useWishlist } from "hooks/useWishlist";
import { useEffect } from "react";
import { useAuthStore } from "store/auth";
import { useWishlistCount } from "store/wishlistCount";
import WishlistCard from "./WishlistCard";

type WishlistDrawerProps = {
  token: string;
  deviceId: string;
};

const WishlistDrawer: React.FC<WishlistDrawerProps> = (props) => {
  const { token, deviceId } = props;

  const { close, isOpen, open } = useToggle();
  const { getUserWishlists } = useWishlist(token);
  const { setUserWishlist } = useWishlistCount();
  const isAuthenticated = useAuthStore().isAuthenticated;

  const { data: userWishlistData } = useQuery({
    queryKey: ["get-user-wishlist"],
    queryFn: getUserWishlists,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setUserWishlist(userWishlistData?.items || []);
  }, [setUserWishlist, userWishlistData?.items]);

  const wishListItems = useWishlistCount().userWishlist;

  return (
    <div>
      <span onClick={open} className="cursor-pointer">
        <Badge content={wishListItems?.length || 0}>
          <IconButton>
            <Icons.heart />
          </IconButton>
        </Badge>
      </span>
      <Drawer isOpen={isOpen} onClose={close} direction="right">
        <div className="flex h-full flex-col px-4 py-5">
          <div className="flex items-center justify-between">
            <h4>Wishlist</h4>
            <p className="text-description">
              {wishListItems?.length || 0} items
            </p>
          </div>
          <Divider className="my-4" />
          {wishListItems?.length < 1 && (
            <h6 className="text-center">No items in wishlist</h6>
          )}
          <div className="flex flex-col gap-5">
            {wishListItems?.map((item, index) => (
              <WishlistCard
                key={index}
                skuId={item}
                token={token}
                deviceId={deviceId}
              />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default WishlistDrawer;
