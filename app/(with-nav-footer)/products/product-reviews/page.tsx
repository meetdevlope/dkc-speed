import Divider from "components/Divider";
import { ImageComponent } from "components/image-component/ImageComponent";
import { getToken } from "utils/getToken";
import { getProductDetails, getProductReviews } from "../[slug]/action";
import RatingBar from "../[slug]/components/product-review/RatingsBar";
import ReviewGalleryPopUp from "../[slug]/components/product-review/ReviewGalleryPopUp";
import { FilledStar } from "../[slug]/components/product-review/StarRating";
import UserReviewCard from "../[slug]/components/product-review/UserReviewCard";
import Filters from "./components/Filters";
import LoadMore from "./components/LoadMore";
import MaxWidthWrapper from "components/MaxWidthWrapper";

const ProductReviewsScreen = async (params) => {
  const {
    searchParams: { productId, isAscending, dbField, pageSize },
  } = params;
  const token = getToken();

  const {
    data: productReviews,
    averageReviews,
    ratingsMap,
    meta,
  } = await getProductReviews(productId, {
    pageSize: pageSize,
    isAscending,
    dbField,
  });

  const { photos, name } = await getProductDetails(token || "", productId);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-start p-4 md:flex-row md:gap-8 lg:gap-12">
        <div className="relative top-4 w-full md:sticky md:w-96">
          <div className="relative aspect-3/4 w-full">
            <ImageComponent src={photos?.[0]} alt={name + "-alt"} fill />
          </div>
          <h3 className="mt-4"> {name} </h3>
        </div>
        <div className="mt-4 w-full md:flex-1">
          <div className="mt-6 flex w-full max-w-5xl items-center gap-2">
            <div className="mb-3 flex w-36 flex-col gap-2">
              <div className="flex items-center gap-x-2">
                <h1 className="font-secondary font-semibold">
                  {averageReviews}
                </h1>
                <FilledStar className="size-6 text-amber-500" />
              </div>
              <h6 className="text-nowrap">
                {(Array.isArray(productReviews) && productReviews?.length) || 0}{" "}
                reviews
              </h6>
            </div>
            <RatingBar ratingData={ratingsMap} />
          </div>
          <Divider className="mt-8" />
          <div className="-mx-4 my-7 flex items-center justify-between rounded-lg bg-blue-light p-4">
            <h5 className="font-medium">Customer Reviews</h5>
            <Filters />
          </div>
          <div className="flex flex-col gap-y-8">
            {Array.isArray(productReviews) &&
              productReviews?.length > 0 &&
              productReviews
                // ?.slice(0, maxReviewListLength)
                ?.map((item, index) => (
                  <div key={index}>
                    <UserReviewCard
                      reviewIndex={index}
                      maxImagesToShow={4}
                      {...item}
                    />
                    {index + 1 !== productReviews?.length && <Divider />}
                  </div>
                ))}
            {pageSize < meta?.totalRows && <LoadMore />}
          </div>
        </div>
        <ReviewGalleryPopUp reviews={productReviews} />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductReviewsScreen;
