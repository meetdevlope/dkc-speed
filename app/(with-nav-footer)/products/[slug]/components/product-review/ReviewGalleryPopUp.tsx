"use client";

import Dialog from "components/Dialog";
import React from "react";
import useReviewGalleryStore from "store/reviewGalleryStore";
import ReviewGallery from "./ReviewGallery";
import { ProductReview } from "types/product.types";

type ReviewGalleryPopUpProps = {
  reviews: ProductReview[];
};

const ReviewGalleryPopUp: React.FC<ReviewGalleryPopUpProps> = (props) => {
  const { reviews } = props;

  const { closeGallery, isGalleryOpen, currentImageIndex, currentReviewIndex } =
    useReviewGalleryStore();

  return (
    <Dialog
      isOpen={isGalleryOpen}
      onClose={closeGallery}
      title={
        `${reviews[currentReviewIndex]?.userName}'s Review` ||
        "User Review Images"
      }
      size="lg"
      noClose
    >
      <ReviewGallery
        reviews={reviews}
        initialImageIndex={currentImageIndex}
        initialReviewIndex={currentReviewIndex}
      />
    </Dialog>
  );
};

export default ReviewGalleryPopUp;
