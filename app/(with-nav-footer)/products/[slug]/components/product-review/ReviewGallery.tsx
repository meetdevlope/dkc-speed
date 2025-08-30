"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import Initials from "components/Initials";
import Slider from "components/slider/Slider";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ProductReview } from "types/product.types";
import { cn } from "utils/helpers"; // Assuming this is your utility function
import StarRating from "./StarRating";

interface ReviewGalleryProps {
  reviews: ProductReview[];
  initialReviewIndex?: number;
  initialImageIndex?: number;
  className?: string;
}

const ReviewGallery: React.FC<ReviewGalleryProps> = ({
  reviews,
  initialReviewIndex = 0,
  initialImageIndex = 0,
  className,
}) => {
  const [currentReviewIndex, setCurrentReviewIndex] =
    useState(initialReviewIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  const currentReview = reviews[currentReviewIndex];

  const goToNextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    setCurrentImageIndex(0);
  };

  const goToPrevReview = () => {
    setCurrentReviewIndex(
      (prev) => (prev - 1 + reviews.length) % reviews.length,
    );
    setCurrentImageIndex(0);
  };

  if (reviews.length === 0) return null;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col bg-white md:p-4",
        className,
      )}
    >
      {/* Navigation arrows for reviews */}
      <div className="absolute inset-0 top-[40%] z-50 flex max-h-7 items-center justify-between">
        <NavigateButton onClick={goToPrevReview} isPrevious />
        <NavigateButton onClick={goToNextReview} />
      </div>
      {/* Main Content */}
      <div className="relative flex flex-1 flex-col md:flex-row">
        {/* Left: Main image slider */}
        <div className="relative w-full md:w-1/2">
          {/* Current main image */}
          <div className="relative mx-auto aspect-3/4 h-80 overflow-hidden rounded-lg md:h-96">
            {currentReview.images.length > 0 && (
              <div className="relative h-full w-full">
                <ImageComponent
                  src={currentReview.images[currentImageIndex]}
                  alt={currentReview.userName[currentImageIndex] + "-alt"}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Thumbnail slider */}
          {currentReview.images.length > 1 && (
            <div className="mt-4 px-2">
              <Slider
                perPage={6}
                slidesSpacing={0}
                showDots={false}
                draggable={true}
                key={`thumbnail-slider-${currentReviewIndex}`}
                slides={currentReview.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "fall relative aspect-3/4 w-full max-w-10 overflow-hidden rounded transition",
                      currentImageIndex === idx
                        ? "border border-blue-500"
                        : "border border-gray-200",
                    )}
                  >
                    <ImageComponent
                      src={image}
                      alt={idx + "-alt"}
                      width={40}
                      height={40}
                      className="rounded object-cover"
                    />
                  </button>
                ))}
              />
            </div>
          )}
        </div>

        {/* Right: Review details */}
        <div className="mt-6 flex w-full flex-col px-0 md:mt-0 md:w-1/2 md:px-6">
          <div className="flex items-center">
            {/* User photo */}

            {currentReview.userPhoto ? (
              <div className="relative max-h-10 min-h-10 max-w-10 min-w-10 overflow-hidden rounded-full">
                <ImageComponent
                  src={currentReview.userPhoto || ""}
                  alt=""
                  fill
                />
              </div>
            ) : (
              <Initials
                name={currentReview.userName}
                className="size-8 min-w-8 text-base md:size-10 md:min-w-10"
              />
            )}

            {/* User info */}
            <div className="ml-4 flex w-full flex-col">
              <h3 className="text-base font-medium text-gray-900 md:text-lg">
                {currentReview.userName}
              </h3>
              <div className="flex w-full items-center justify-between">
                <p className="text-xs text-gray-500 md:text-sm">
                  {dayjs(currentReview.createdDate).format("DD MMM YYYY")}
                </p>
                <StarRating
                  value={currentReview.ratings}
                  size="small"
                  showSingleDigit
                />
              </div>
            </div>
          </div>

          {/* Review text */}
          <div className="mt-4 flex-1 overflow-y-auto">
            <p className="text-gray-700">{currentReview.description}</p>
          </div>

          {/* Review counter */}
          <div className="mt-6 text-sm text-gray-500">
            <p className="text-right">
              Review {currentReviewIndex + 1} of {reviews.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavigateButton = ({
  onClick,
  isPrevious = false,
}: {
  onClick: () => void;
  isPrevious?: boolean;
}) => (
  <button
    onClick={onClick}
    className="flex size-7 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-800 shadow-md transition hover:bg-white"
    aria-label="Next review"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{
        transform: `scale(${isPrevious ? -1 : 1})`,
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

export default ReviewGallery;
