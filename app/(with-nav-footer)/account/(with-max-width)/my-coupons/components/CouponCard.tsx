"use client";
import React, { FC, useEffect, useState } from "react";
import {
  getBrandCouponsDetails,
  getDkcCouponsDetails,
  MyCouponListType,
} from "../action";
import { CouponType, DiscountType } from "../../redeem-coupons/action";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import { ImageComponent } from "components/image-component/ImageComponent";
import Logo from "components/logo/Logo";
import { Button } from "components/Button";
import NoData from "components/NoData";
import IconButton from "components/IconButton";
import { Icons } from "components/Icons";
import dayjs from "dayjs";

type Props = {
  data: MyCouponListType;
  token: string;
};

const CouponCard: FC<Props> = (props) => {
  const { data, token } = props;
  const [brandCouponDetails, setBrandCouponDetails] = useState<CouponType>();
  const [dkcCouponDetails, setDkcCouponDetails] = useState<DiscountType>();
  const { isOpen, toggle } = useToggle();
  const { close: closeDesc, isOpen: isDescOpen, open: openDesc } = useToggle();

  useEffect(() => {
    const fetchCouponDetail = async () => {
      if (data?.isBrandCoupon) {
        const details = await getBrandCouponsDetails(token, data?.couponRefId);
        setBrandCouponDetails(details);
      } else {
        const details = await getDkcCouponsDetails(token, data?.couponRefId);
        setDkcCouponDetails(details);
      }
    };
    if (data?.couponRefId) {
      fetchCouponDetail();
    }
  }, [data?.addedFromBrandBag, data?.couponRefId, data?.isBrandCoupon, token]);
  return (
    <div className="flex items-start gap-4 rounded-xl border border-neutral-100 px-4 py-5 shadow-xs">
      {data?.isBrandCoupon ? (
        brandCouponDetails?.photo && brandCouponDetails?.photo?.length > 0 ? (
          <ImageComponent
            src={brandCouponDetails?.photo}
            alt=""
            width={64}
            height={64}
          />
        ) : (
          <Logo className="w-16" />
        )
      ) : (
        <Logo className="w-16" />
      )}
      <div className="w-full">
        <h4>{brandCouponDetails?.title || dkcCouponDetails?.title}</h4>
        <div className="flex flex-col gap-1">
          <p>
            Purchase Date :{" "}
            <strong className="tracking-widest">
              {new Date(data?.createdDate)?.toLocaleDateString("in")}
            </strong>
          </p>
          <div className="flex items-center gap-1">
            <strong className="tracking-widest">
              {isOpen ? data?.couponCode : "*".repeat(data?.couponCode?.length)}
            </strong>
            <IconButton onClick={toggle} size={4}>
              {isOpen ? <Icons.eyeClose /> : <Icons.eyeOpen />}
            </IconButton>
          </div>
          <div className="flex justify-between">
            <Button
              className="px-0"
              variant="link"
              size="sm"
              onClick={openDesc}
            >
              Terms & eligibility
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        isOpen={isDescOpen}
        onClose={closeDesc}
        title="Terms & eligibility"
        noClose
      >
        {data?.isBrandCoupon ? (
          brandCouponDetails?.description &&
          brandCouponDetails?.description?.length > 0 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: brandCouponDetails?.description,
              }}
            />
          ) : (
            <NoData title="No details added" />
          )
        ) : (
          <div>
            {dkcCouponDetails?.description &&
              dkcCouponDetails?.description?.length > 0 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dkcCouponDetails?.description,
                  }}
                  className="pb-2"
                />
              )}
            <div className="text-sm font-light">
              <div>
                Product Eligibility:{" "}
                {dkcCouponDetails?.details?.productQuery
                  ? dkcCouponDetails?.details?.productQuery?.length > 0
                    ? "Specific Products"
                    : "All Products"
                  : "All Products"}
              </div>
              <div>
                Usage:{" "}
                {dkcCouponDetails?.limitUsageCondition?.includes[
                  "one_use_per_customer"
                ]
                  ? "Can be redeemed and used only once"
                  : "You can purchase it several times"}
              </div>
              <div>
                Minimum requirements:{" "}
                {dkcCouponDetails?.minPurchaseCondition === "min_amount"
                  ? `Must purchase for minimum amount ${dkcCouponDetails?.minPurchaseValue}`
                  : dkcCouponDetails?.minPurchaseCondition === "min_quantity"
                    ? `Must add ${dkcCouponDetails?.minPurchaseValue} items in cart`
                    : "No minimum requirements"}
              </div>
              <div>
                Validity:{" "}
                {dkcCouponDetails?.endDate
                  ? dkcCouponDetails?.endDate?.length > 0
                    ? dayjs(dkcCouponDetails?.endDate)?.format(
                        "DD MMM YYYY, hh:mm a",
                      )
                    : "N/A"
                  : "N/A"}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default CouponCard;
