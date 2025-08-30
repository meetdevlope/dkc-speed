import SectionTitle from "components/SectionTitle";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";
import { getProductReviews } from "../../action";
import RatingBar from "./RatingsBar";
import ReviewGalleryPopUp from "./ReviewGalleryPopUp";
import { FilledStar } from "./StarRating";
import UserReviewCard from "./UserReviewCard";
import Icon from "components/icon/Icon";

type ProductReviewProps = {
  skuId: string;
};

const ProductReview: React.FC<ProductReviewProps> = async (props) => {
  const { skuId } = props;

  const {
    data: productReviews,
    averageReviews,
    ratingsMap,
  } = (await getProductReviews(skuId)) || {};

  if (
    !Array.isArray(productReviews) ||
    (Array.isArray(productReviews) && productReviews?.length < 1)
  )
    return;

  return (
    <div className="mx-4">
      <div className="my-6 flex items-center justify-between">
        <SectionTitle title="Ratings" />
        {Array.isArray(productReviews) &&
          productReviews?.length > maxReviewListLength && (
            <Link
              href={ROUTES.PRODUCTS.PRODUCT_REVIEWS(skuId)}
              className="hover:text-primary1 text-right text-blue-500 hover:underline"
            >
              View all Reviews
            </Link>
          )}
      </div>
      {Array.isArray(productReviews) && productReviews?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
            <div className="mr-12 flex flex-col">
              <div className="fall mb-6 w-36 items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <h1 className="font-secondary font-semibold">
                    {averageReviews}
                  </h1>
                  <FilledStar className="size-6 text-amber-500" />
                </div>
                <div className="h-7 min-w-[1px] rounded-full bg-neutral-300"></div>
                <h6 className="text-nowrap">
                  {(Array.isArray(productReviews) && productReviews?.length) ||
                    0}{" "}
                  reviews
                </h6>
              </div>
              <RatingBar ratingData={ratingsMap} />
            </div>
            {Array.isArray(productReviews) &&
              productReviews?.length > 0 &&
              productReviews
                ?.slice(0, maxReviewListLength)
                ?.map((item, index) => (
                  <UserReviewCard key={index} reviewIndex={index} {...item} />
                ))}
          </div>
        </>
      ) : (
        <div className="fall flex-col gap-y-2 rounded-xl bg-gray-light p-4">
          <Icon
            name="sad"
            iconType="stroke"
            size={32}
            color="var(--neutral-300)"
            className="stroke-[1.4px]"
          />
          <h6 className="text-center text-neutral-400">No reviews here yet</h6>
        </div>
      )}
      <ReviewGalleryPopUp reviews={productReviews} />
    </div>
  );
};

const maxReviewListLength: number = 2;

export default ProductReview;
