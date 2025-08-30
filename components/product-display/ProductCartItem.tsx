import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import EligiblePrice from "app/(with-nav-footer)/products/[slug]/components/EligiblePrice";
import { ImageComponent } from "components/image-component/ImageComponent";
import dayjs from "dayjs";
import { DiscountTypeEnum } from "enums/discountType.enum";
import Link from "next/link";
import React from "react";
import { RentPriceDistribution } from "types/product.types";
import { GetRentRequestTypes } from "types/rent.types";
import { getSizeFromOptions, jsonParser } from "utils/helpers";
import { RentUtils } from "utils/rent";
import { ROUTES } from "utils/routes";
import DeleteCartItem from "../cart/DeleteCartItem";
import Icon from "components/icon/Icon";
import { CurrencyDisplay } from "components/CurrencyDisplay";

export type ProductCartItemProps = {
  token: string;
  cartId?: string;
  deviceId: string;
  skuId: string;
  noDelete?: boolean;
  forRent?: boolean;
  rentStartDate?: Date;
  rentEndDate?: Date;
  viewMode?: boolean;
  rentDays: number;
  showViewRentDetailsButton?: boolean;
  orderReferenceId?: string;
};

const ProductCartItem: React.FC<ProductCartItemProps> = (props) => {
  const {
    skuId,
    token,
    deviceId,
    noDelete = false,
    cartId,
    forRent,
    rentEndDate,
    rentStartDate,
    viewMode,
    rentDays = 0,
    orderReferenceId = "",
    showViewRentDetailsButton = false,
  } = props;

  // const [productDetails, setProductDetails] = useState<Product>();

  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     if (skuId) {
  //       const data = await getProductDetails(token, skuId);
  //       setProductDetails(data);
  //     }
  //   };
  //   fetchProductDetails();
  // }, [token, skuId]);

  const { data: productDetails } = useQuery({
    queryKey: [`get-product-details-${skuId}`],
    queryFn: () => getProductDetails(token, skuId),
    enabled: Boolean(skuId),
  });

  const rentPriceDistributionData: RentPriceDistribution[] = jsonParser(
    productDetails?.rentPriceDistribution,
  );

  const getRentTotalRequest: GetRentRequestTypes = {
    days: rentDays,
    discountType: productDetails?.rentDiscountType as DiscountTypeEnum,
    discount: Array.isArray(rentPriceDistributionData)
      ? Number(
          rentPriceDistributionData
            .filter((e) => e.days === rentDays)
            ?.map((i) => i.discount) || 0,
        )
      : 0,
    perDayPrice: Number(productDetails?.rentPrice),
  };

  const productSize = getSizeFromOptions(productDetails?.options);
  const productPrice = forRent
    ? RentUtils.getRentTotalDigits(getRentTotalRequest)
    : productDetails?.sellingPrice;

  return (
    <div>
      <div className="flex gap-4">
        <Link href={ROUTES.PRODUCTS.SLUG(skuId)}>
          <div className="shimmer-loading relative aspect-3/4 min-w-16 overflow-hidden rounded md:min-w-18">
            <ImageComponent
              fill
              src={productDetails?.photos[0] || ""}
              objectFit="cover"
              objectPosition="center"
              alt={`${productDetails?.name}-image`}
            />
          </div>
        </Link>

        <div className="my-auto flex w-full flex-col gap-1">
          <Link href={ROUTES.PRODUCTS.SLUG(skuId)}>
            <div className="flex items-center justify-between gap-2">
              <h6 className="one-lines-ellipsis font-medium">
                {productDetails?.name}
              </h6>
              <div className="ml-auto flex flex-col items-end justify-between">
                {!noDelete && (
                  <div className="flex flex-col items-end justify-evenly">
                    <DeleteCartItem
                      deleteId={cartId || ""}
                      deviceId={deviceId}
                      token={token}
                    />
                  </div>
                )}
              </div>
            </div>
            {productSize && (
              <p className="text-neutral-400">
                Size: <span className="capitalize">{productSize}</span>
              </p>
            )}
          </Link>

          {!viewMode && (
            <div className="flex items-center gap-x-4">
              <EligiblePrice
                skuId={skuId}
                originalPrice={productDetails?.totalPrice || 0}
                sellingPrice={productPrice || 0}
                showPriceWithSelling
                rentalSubTotal={(productDetails?.rentPrice || 0) * rentDays}
              />
              {forRent && productDetails?.rentPrice && (
                <div className="mt-0.5 flex items-center gap-x-1 rounded bg-blue-light p-1">
                  <CurrencyDisplay
                    amount={productDetails?.rentPrice}
                    className="text-xs text-neutral-400"
                  />
                  <p className="text-neutral-400"> X {rentDays} days </p>
                </div>
              )}
            </div>
          )}
        </div>

        {viewMode && (
          <div className="flex h-full flex-col justify-center">
            <EligiblePrice
              skuId={skuId}
              originalPrice={productDetails?.totalPrice || 0}
              sellingPrice={productPrice || 0}
              showPriceWithSelling
            />
          </div>
        )}
      </div>

      {forRent && (
        <div className="mt-1 rounded-md bg-blue-light p-1">
          <h6 className="text-center text-xs text-neutral-400">
            Rental period for this item:{" "}
            <span className="text-xs font-medium text-neutral-500">
              {dayjs(rentStartDate).format("DD MMM YY")}
            </span>{" "}
            to{" "}
            <span className="text-xs font-medium text-neutral-500">
              {dayjs(rentEndDate).format("DD MMM YY")}{" "}
            </span>
          </h6>
        </div>
      )}

      {showViewRentDetailsButton && (
        <Link
          href={ROUTES.ACCOUNT.RENT_ORDER_DETAILS(
            `?orderReferenceId=${orderReferenceId}&skuId=${skuId}`,
          )}
          className="mt-2 flex w-full items-center justify-center gap-x-1 rounded bg-dune py-1 text-center text-xs text-neutral-500 hover:underline"
        >
          View Rent Details
          <Icon
            name="external-link"
            iconType="stroke"
            color="var(--neutral-400)"
            className="stroke-[2px]"
            size={16}
          />
        </Link>
      )}
    </div>
  );
};

export default ProductCartItem;
