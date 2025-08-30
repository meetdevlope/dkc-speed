"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CouponType, redeemCoupon } from "../action";
import { ImageComponent } from "components/image-component/ImageComponent";
import Logo from "components/logo/Logo";
import { Button } from "components/Button";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import NoData from "components/NoData";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type Props = {
  data: CouponType;
  pointEarned: number;
  handlePointsDeduct: (points: number) => void;
  token: string;
  selectedTab: "dkc" | "brand";
};

const BrandRedeemCard: React.FC<Props> = (props) => {
  const {
    data: pData,
    handlePointsDeduct,
    pointEarned,
    token,
    selectedTab,
  } = props;
  const [data, setData] = useState(pData);
  const { close, isOpen, open } = useToggle();
  const { close: closeDesc, isOpen: isDescOpen, open: openDesc } = useToggle();

  const redeemCouponAsync = useCallback(
    async (couponId: string) => {
      const res = await redeemCoupon(
        token,
        couponId,
        selectedTab === "brand" ? "brand-coupon" : "dkc-coupon",
      );
      if (res) {
        setData((prev) => ({ ...prev, quantity: prev?.quantity - 1 }));
        handlePointsDeduct(pData?.points);
        close();
        return res;
      }
      throw new Error("Failed to redeem coupon");
    },
    [token, selectedTab, handlePointsDeduct, pData?.points, close],
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: redeemCouponAsync,
    onSuccess: () => {
      toast.success("Coupon redeemed successfully");
    },
    onError: (error) => {
      console.error("Error redeeming coupon:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to redeem coupon",
      );
    },
  });

  const handleRedeem = useCallback(async () => {
    if (!data?._id) {
      toast.error("Invalid coupon data");
      return;
    }

    try {
      await mutateAsync(data._id);
    } catch (error) {
      console.error("Redeem failed:", error);
    }
  }, [data?._id, mutateAsync]);

  useEffect(() => {
    if (pData) {
      setData(pData);
    }
  }, [pData]);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-neutral-100 px-4 py-5 shadow-xs">
      {data?.photo?.length > 0 ? (
        <ImageComponent src={data?.photo} alt="" width={64} height={64} />
      ) : (
        <Logo className="w-16" />
      )}
      <div className="w-full">
        <h4>{data?.title}</h4>
        <div className="flex flex-col gap-1">
          <p>
            Points required : <strong>{data?.points}</strong> pts
          </p>
          <div className="flex justify-between">
            <Button
              className="px-0"
              variant="link"
              size="sm"
              onClick={openDesc}
            >
              Terms & eligibility
            </Button>
            <Button
              onClick={open}
              size="sm"
              disabled={
                data?.quantity === 0 || data?.points > pointEarned || isPending
              }
            >
              {isPending ? "Redeeming..." : "Redeem"}
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Redeem Coupon"
        actions={{
          primary: {
            label: isPending ? "Redeeming..." : "Yes",
            onClick: handleRedeem,
            size: "md",
            className: "bg-danger-500",
            loading: isPending,
            disabled: isPending,
          },
        }}
      >
        <h6 className="mb-4 px-2 font-medium">
          Are you sure you want to Redeem this coupon?
        </h6>
      </Dialog>
      <Dialog
        isOpen={isDescOpen}
        onClose={closeDesc}
        title="Terms & eligibility"
        noClose
      >
        {data?.description?.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: data?.description,
            }}
          />
        ) : (
          <NoData title="No details added" />
        )}
      </Dialog>
    </div>
  );
};

export default BrandRedeemCard;
