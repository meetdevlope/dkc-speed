"use client";

import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import { useToggle } from "hooks/useToggle";
import React, { useCallback, useState } from "react";
import { useAuthStore } from "store/auth";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";
import { useWishlistCount } from "store/wishlistCount";
import { EmailOTP } from "utils/emailOTP";
import { generateAndSetDeviceID } from "utils/generateAndSetDeviceId";
import { ROUTES } from "utils/routes";
import { removeUserEmail } from "utils/user-email";

type LogoutProps = {
  token: string;
  deviceId: string;
};

const Logout: React.FC<LogoutProps> = () => {
  const logoutUser = useAuthStore().clearUser;
  const emptyCart = useCartStore((state) => state.emptyCart);
  const emptyCartCount = useCartCount((state) => state.emptyCartCount);
  const emptyWishlistCount = useWishlistCount(
    (state) => state.emptyWishlistCount,
  );

  const { close, isOpen, open } = useToggle();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(async () => {
    setIsLoading(true);

    try {
      await fetch(`/api/register`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await generateAndSetDeviceID();
      emptyCart();
      emptyCartCount();
      emptyWishlistCount();
      EmailOTP.removeLocalEmail();
      logoutUser();
      removeUserEmail();

      window.location.href = ROUTES.SHOP;
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [emptyCart, emptyCartCount, emptyWishlistCount, logoutUser]);

  return (
    <>
      <div
        className="mt-4 flex cursor-pointer items-center justify-between border-b border-b-neutral-100 py-2 text-sm font-medium text-neutral-500"
        onClick={open}
      >
        <p className="text-sm font-medium">Logout</p>
        <Icon
          name="chevron"
          color="var(--neutral-400)"
          iconType="stroke"
          className="-rotate-90"
          size={22}
        />
      </div>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Logout?"
        actions={{
          primary: {
            label: "Logout",
            onClick,
            size: "md",
            className: "bg-danger-500 hover:bg-danger-600",
            loading: isLoading,
          },
        }}
      >
        <h6 className="mb-4 px-2 font-medium">
          Are you sure you want to logout?
        </h6>
      </Dialog>
    </>
  );
};

export default Logout;
