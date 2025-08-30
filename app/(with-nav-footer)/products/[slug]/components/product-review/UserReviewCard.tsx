import Initials from "components/Initials";
import { ImageComponent } from "components/image-component/ImageComponent";
import dayjs from "dayjs";
import React from "react";
import { ProductReview } from "types/product.types";
import StarRating from "./StarRating";
import UserReviewPhoto from "./UserReviewPhoto";

const UserReviewCard: React.FC<
  ProductReview & { reviewIndex: number; maxImagesToShow?: number }
> = (props) => {
  const {
    description,
    images,
    ratings,
    createdDate,
    userName,
    userPhoto,
    reviewIndex,
    maxImagesToShow = 4,
  } = props;

  return (
    <div className="flex w-full flex-col items-start gap-3 border-b border-b-neutral-200 pb-6 lg:border-none">
      <div className="flex w-full items-center gap-x-3">
        {userPhoto ? (
          <div className="relative max-h-10 min-h-10 max-w-10 min-w-10 overflow-hidden rounded-full">
            <ImageComponent src={userPhoto || ""} alt="" fill />
          </div>
        ) : (
          <Initials name={userName} className="size-10 min-w-10 text-base" />
        )}
        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium">{userName}</h6>
            <span>•</span>
            <span className="mr-auto text-neutral-400">
              {dayjs(createdDate).format("DD MMM YY")}{" "}
            </span>
            <StarRating showSingleDigit value={ratings} size="small" />
          </div>
        </div>
      </div>
      <div className="ml-11 px-2">
        {description && (
          <h6 className="text-description mb-2">{description}</h6>
        )}
        {Array.isArray(images) && images?.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            {images
              ?.slice(0, maxImagesToShow)
              ?.map((item, index) => (
                <UserReviewPhoto
                  key={index}
                  image={item}
                  userName={userName}
                  imageIndex={index}
                  reviewIndex={reviewIndex}
                />
              ))}
            {Array.isArray(images) && images?.length > maxImagesToShow && (
              <UserReviewPhoto
                image={images[maxImagesToShow]}
                userName={userName}
                imageIndex={maxImagesToShow}
                reviewIndex={reviewIndex}
                remainingCount={images?.length - maxImagesToShow}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviewCard;
