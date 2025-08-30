"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "components/Button";
import { Icons } from "components/Icons";
import { Input } from "components/Input";
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DiscountResponse } from "types/product.types";
import { z } from "zod";
import { getCouponDiscount } from "../action";
import Spinner from "components/spinner/Spinner";
import { useCartStore } from "store/cart";
import { useToggle } from "hooks/useToggle";
import Dialog from "components/Dialog";

type DiscountCodeProps = {
  token: string;
  setCouponConfig: React.Dispatch<SetStateAction<DiscountResponse>>;
};

const couponSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

type CouponCodeFormTypes = z.infer<typeof couponSchema>;

const setProductDiscount = (myDiscounts: DiscountResponse) => {
  useCartStore.setState({ myDiscounts });
};

const defaultDiscountResponse = {
  discountTitle: "",
  discountMap: {},
};

const DiscountCode: React.FC<DiscountCodeProps> = (props) => {
  const { token, setCouponConfig } = props;

  const [showCouponDetails, setShowCouponDetails] = useState(false);
  const [apiData, setApiData] = useState<DiscountResponse>();
  const [fetching, setFetching] = useState(false);
  const [tempConfig, setTempConfig] = useState<DiscountResponse>(
    defaultDiscountResponse,
  );

  const { isOpen, close, open } = useToggle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm<CouponCodeFormTypes>({
    resolver: zodResolver(couponSchema),
  });

  const code = watch("code");

  const applyCouponDiscount = useCallback(
    (data: DiscountResponse) => {
      setShowCouponDetails(true);
      if (data) {
        setCouponConfig(data);
        setProductDiscount(data);
      } else {
        console.log("no api data");
      }
      close();
    },
    [close, setCouponConfig],
  );

  const productDiscount = useCartStore((state) => state.myDiscounts);

  const totalProductDiscount = useMemo(() => {
    if (productDiscount) {
      return Object.values(productDiscount.discountMap || {}).reduce(
        (cur, total) => cur + total,
        0,
      );
    }
    return 0;
  }, [productDiscount]);

  const getDiscount = useCallback(async () => {
    try {
      setFetching(true);
      const data = await getCouponDiscount(token, code);
      if (Object.keys(data.discountMap || {}).length > 0) {
        const couponTotal = Object.values(data.discountMap).reduce(
          (cur, total) => cur + total,
          0,
        );
        setApiData(data);

        if (totalProductDiscount > couponTotal) {
          open();
        } else {
          applyCouponDiscount(data);
        }

        setFetching(false);
      } else {
        setFetching(false);
        setShowCouponDetails(false);
        setError("code", {
          message: "No such coupon found",
        });
      }
    } catch (error) {
      setError("code", {
        message: "Failed to get discount",
      });
      setFetching(false);
      console.log(error, "Error while fetching coupon discount");
    }
  }, [applyCouponDiscount, code, open, setError, token, totalProductDiscount]);

  const isApplicable = useMemo(
    () => apiData?.discountTitle,
    [apiData?.discountTitle],
  );

  const totalCouponDiscount = useMemo(() => {
    if (apiData?.discountMap) {
      return Object.values(apiData?.discountMap).reduce(
        (curr, tot) => curr + tot,
        0,
      );
    }
    return 0;
  }, [apiData?.discountMap]);

  const onSubmit: SubmitHandler<CouponCodeFormTypes> = () => {
    getDiscount();
  };

  const handleRemoveCoupon = () => {
    setProductDiscount(tempConfig);
    setShowCouponDetails(false);
    setCouponConfig({
      discountMap: {},
      discountTitle: "",
    });
    setValue("code", "");
  };

  const discardDialog = () => {
    setShowCouponDetails(false);
    setValue("code", "");
    close();
  };

  useEffect(() => {
    if (!showCouponDetails) {
      setTempConfig(productDiscount);
    }
  }, [productDiscount, showCouponDetails]);

  return (
    <div className="flex flex-col">
      <form
        className="flex items-start gap-x-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Discount code"
          fullWidth
          {...register("code")}
          error={errors.code?.message}
          helperText={errors.code?.message}
          readOnly={showCouponDetails}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit);
            }
          }}
          rightElement={
            <>
              {showCouponDetails ? (
                <button
                  onClick={handleRemoveCoupon}
                  className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary-200 px-1.5 py-1 text-xs hover:bg-primary-300"
                >
                  Remove
                </button>
              ) : null}
            </>
          }
        />
        <Button type="submit" size="md" className="h-[44px] min-w-[80px]">
          {fetching ? <Spinner size={20} color="beige" /> : "Apply"}
        </Button>
      </form>
      {isApplicable && showCouponDetails && (
        <div className="mt-2 ml-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="block size-5">
              <Icons.success />
            </span>
            <h6 className="font-medium">Coupon Applied</h6>
          </div>
          <h6 className="text-neutral-400">
            You saved:{" "}
            <span className="font-semibold text-green-600">
              ${totalCouponDiscount}
            </span>{" "}
            with{" "}
            <span className="font-medium text-neutral-500">
              {apiData?.discountTitle}
            </span>
          </h6>
        </div>
      )}
      <Dialog
        isOpen={isOpen}
        onClose={discardDialog}
        title="Are you sure?"
        noClose
        actions={{
          primary: {
            label: `Apply $${totalCouponDiscount}`,
            onClick: () =>
              applyCouponDiscount(apiData || defaultDiscountResponse),
          },
          secondary: {
            label: `Keep $${totalProductDiscount} discount`,
            onClick: discardDialog,
          },
        }}
      >
        The{" "}
        <span className="text-base font-bold text-red-600">
          ${totalCouponDiscount}
        </span>{" "}
        coupon discount is less than the{" "}
        <span className="text-base font-bold text-green-600">
          {" "}
          ${totalProductDiscount}
        </span>{" "}
        product discount.
      </Dialog>
    </div>
  );
};

export default DiscountCode;
