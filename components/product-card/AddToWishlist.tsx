"use client";

import { useMutation } from "@tanstack/react-query";
import Icon from "components/icon/Icon";
import { useWishlist } from "hooks/useWishlist";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "store/auth";
import { useWishlistCount } from "store/wishlistCount";

type AddToWishlistProps = {
  wishlistNumber: number;
  skuId: string;
  token: string;
};

const AddToWishlist: React.FC<AddToWishlistProps> = (props) => {
  const { skuId, token } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { addToUserWishlist, removeUserWishlist, isWishListed } =
    useWishlistCount();

  const isAuthenticated = useAuthStore().isAuthenticated;
  const { updateWishlist } = useWishlist(token);
  const isItemWishListed = isWishListed(skuId);

  const { mutateAsync: updateCartMutation } = useMutation({
    mutationFn: updateWishlist,
    onSuccess: (isAdded) => {
      if (isAdded) {
        addToUserWishlist(skuId);
      } else {
        removeUserWishlist(skuId);
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(
        error.message || "Could not add item to wishlist. Try again!",
      );
    },
  });

  const handleAddToWishlistClick = () => {
    if (isAuthenticated) {
      updateCartMutation(skuId);
    } else {
      const redirectTo = encodeURIComponent(pathname);
      router.push(`/login?redirectTo=${redirectTo}`);
    }
  };

  return (
    <span onClick={handleAddToWishlistClick}>
      {isItemWishListed ? (
        <Icon name="heart-filled" color="var(--danger-400)" size={20} />
      ) : (
        <Icon
          name="heart"
          iconType="stroke"
          className="stroke-[1.5px]"
          size={20}
        />
      )}
    </span>
  );
};

export default AddToWishlist;
