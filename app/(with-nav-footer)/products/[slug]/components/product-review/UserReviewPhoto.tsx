"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import useReviewGalleryStore from "store/reviewGalleryStore";

type UserReviewPhotoProps = {
  image: string;
  userName: string;
  imageIndex: number;
  reviewIndex: number;
  remainingCount?: number;
};

const UserReviewPhoto: React.FC<UserReviewPhotoProps> = (props) => {
  const {
    image,
    imageIndex,
    userName,
    reviewIndex,
    remainingCount = 0,
  } = props;

  const { openGallery } = useReviewGalleryStore();

  return (
    <div
      className="relative aspect-3/4 w-10 cursor-pointer overflow-hidden rounded border border-transparent hover:border-neutral-400"
      onClick={() => openGallery(reviewIndex, imageIndex)}
    >
      <ImageComponent
        src={image || ""}
        alt={`${userName}review-${imageIndex}-alt`}
        fill
        className="rounded transition-all"
      />
      {remainingCount > 0 && (
        <div className="fall absolute top-0 left-0 h-full w-full bg-black/75">
          <h6 className="font-semibold text-white">+{remainingCount}</h6>
        </div>
      )}
    </div>
  );
};

export default UserReviewPhoto;
