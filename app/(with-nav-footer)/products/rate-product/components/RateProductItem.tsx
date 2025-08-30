"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Badge from "components/Badge";
import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import ImageUploader from "components/ImageUploader";
import TextArea from "components/TextArea";
import { useToggle } from "hooks/useToggle";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { EditProductReviewReq } from "types/product.types";
import StarRating from "../../[slug]/components/product-review/StarRating";
import { editProductReview, getUsersProductReview } from "../action";

type RateProductItemProps = {
  img: string;
  name: string;
  skuId: string;
  orderId: string;
  index: number;
  imageBadge?: number;
  token: string;
};

const RateProductItem: React.FC<RateProductItemProps> = ({
  img,
  name,
  skuId,
  orderId,
  index,
  imageBadge,
  token,
}) => {
  const queryKey = ["users-product-review", skuId];

  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [originalValues, setOriginalValues] = useState({
    ratings: 0,
    description: "",
    images: [] as string[],
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const ratings = useWatch({
    name: `productReviews.${index}.ratings`,
  });
  const {
    isOpen: isEditMode,
    open: setEditMode,
    close: closeEditMode,
  } = useToggle();

  const handleStarChange = (_, newValue: number | null) => {
    if (!isEditMode && Object.keys(usersProductReview || {}).length > 0) {
      return;
    }
    setValue(`productReviews.${index}.ratings`, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setValue(`productReviews.${index}.skuId`, skuId);
  }, [skuId, index, setValue]);

  const errorMessage = errors?.productReviews?.[index]?.description?.message as
    | string
    | undefined;

  const { data: usersProductReview, isPending } = useQuery({
    queryFn: () => getUsersProductReview(token, skuId, orderId),
    queryKey: queryKey,
  });

  const hasExistingReview = Object.keys(usersProductReview || {}).length > 0;
  const hasExistingPhotos =
    Object.keys(usersProductReview?.images || {}).length > 0;
  const isReadOnly = hasExistingReview && !isEditMode;

  useEffect(() => {
    if (hasExistingReview) {
      setValue(`productReviews.${index}.alreadyRated`, true);
      setValue(
        `productReviews.${index}.ratings`,
        usersProductReview?.ratings || 0,
      );
      if (usersProductReview?.description) {
        setValue(
          `productReviews.${index}.description`,
          usersProductReview?.description || "",
        );
      }
      if (
        usersProductReview?.images &&
        usersProductReview?.images?.length > 0
      ) {
        setValue(
          `productReviews.${index}.images`,
          usersProductReview?.images || [],
        );
      }
      setOriginalValues({
        ratings: usersProductReview?.ratings || 0,
        description: usersProductReview?.description || "",
        images: usersProductReview?.images || [],
      });
      setUploadedImages(usersProductReview?.images || []);
    }
  }, [hasExistingReview, index, setValue, usersProductReview]);

  const handleEditClick = () => {
    setOriginalValues({
      ratings: getValues(`productReviews.${index}.ratings`) || 0,
      description: getValues(`productReviews.${index}.description`) || "",
      images: getValues(`productReviews.${index}.images`) || [],
    });
    setEditMode();
  };

  const handleCancelEdit = () => {
    setValue(`productReviews.${index}.ratings`, originalValues.ratings);
    setValue(`productReviews.${index}.description`, originalValues.description);
    setValue(`productReviews.${index}.images`, originalValues.images);
    setUploadedImages(originalValues.images);
    closeEditMode();
  };

  const { mutate: editProductReviewMutate, isPending: isEditing } = useMutation(
    {
      mutationFn: (reviewData: EditProductReviewReq) =>
        editProductReview(token, usersProductReview?._id || "", reviewData),
      onSuccess: () => {
        closeEditMode();
        setUploadedImages([]);
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
      },
    },
  );

  const handleSaveEdit = () => {
    const reviewData: EditProductReviewReq = {
      ratings: getValues(`productReviews.${index}.ratings`),
      description: getValues(`productReviews.${index}.description`),
      images: uploadedImages,
    };
    try {
      editProductReviewMutate(reviewData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePhoto = (imageUrl: string) => {
    setUploadedImages((prev) => prev.filter((e) => e !== imageUrl));
  };

  const handleImageUploaded = (imageUrls: string[]): void => {
    setUploadedImages((prev) => [...prev, ...imageUrls]);
    if (!isEditMode) {
      setValue(`productReviews.${index}.images`, imageUrls);
    }
  };

  return (
    <>
      {!isPending ? (
        <div className="rounded-lg border border-neutral-100 bg-white">
          <div className="flex items-start gap-4 p-4">
            <Badge content={imageBadge || 0}>
              <div className="fall relative aspect-3/4 w-20 overflow-hidden rounded-md border border-neutral-100">
                <ImageComponent
                  src={img}
                  alt={`${name}-thumbnail`}
                  width={70}
                  height={70}
                  className="rounded-md object-center"
                />
              </div>
            </Badge>
            <div className="flex w-full flex-col items-start">
              <div className="flex w-full items-start justify-between">
                <div>
                  <h5 className="mb-2 font-medium">{name}</h5>
                  <StarRating
                    value={ratings || 0}
                    onChange={handleStarChange}
                    readOnly={isReadOnly}
                  />
                </div>

                {hasExistingReview && (
                  <div className="min-w-16">
                    {isEditMode ? (
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isEditing}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={isEditing}
                        >
                          {isEditing ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {errors?.productReviews?.[index]?.ratings && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.productReviews[index]?.ratings?.message as string}
                </p>
              )}
            </div>
          </div>
          {(ratings > 0 || isEditMode) && (
            <div className="p-4 pt-0">
              <TextArea
                placeholder="Tell us about your experience"
                {...register(`productReviews.${index}.description`)}
                error={Boolean(errorMessage)}
                disabled={isReadOnly}
              />
              <div className="mt-4">
                {hasExistingPhotos || uploadedImages?.length > 0 ? (
                  <div className="rounded-lg border border-neutral-100 p-2">
                    <h6 className="mt-1 mb-6 ml-1">
                      Your uploaded product photos
                    </h6>
                    <div className="flex flex-wrap gap-4">
                      {uploadedImages.map((imageUrl, imgIndex) => (
                        <div
                          key={`${imageUrl}-${imgIndex}`}
                          className="relative size-20"
                        >
                          <ImageComponent
                            width={80}
                            height={80}
                            src={imageUrl}
                            alt="Image preview"
                            className="h-full w-full rounded-lg object-cover"
                          />
                          {isEditMode && (
                            <button
                              onClick={() => handleRemovePhoto(imageUrl)}
                              type="button"
                              className="absolute -top-3 -right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-neutral-400 hover:text-neutral-500"
                            >
                              <Icon
                                name="close"
                                iconType="stroke"
                                size={20}
                                className="stroke-[1.4px]"
                              />
                            </button>
                          )}
                        </div>
                      ))}

                      {isEditMode && uploadedImages.length < 10 && (
                        <ImageUploader
                          onImagesUploaded={handleImageUploaded}
                          maxSizeInMB={10}
                          multiple
                          maxFiles={10 - uploadedImages.length}
                          addToExistingOnly
                        />
                      )}
                    </div>
                  </div>
                ) : hasExistingReview ? (
                  <div>
                    {isEditMode ? (
                      <ImageUploader
                        onImagesUploaded={handleImageUploaded}
                        maxSizeInMB={10}
                        multiple
                      />
                    ) : (
                      <div className="mt-2 rounded-xl bg-neutral-50 p-3">
                        <h6 className="text-neutral-400">
                          No product photos uploaded yet
                        </h6>
                      </div>
                    )}
                  </div>
                ) : (
                  <ImageUploader
                    onImagesUploaded={handleImageUploaded}
                    maxSizeInMB={10}
                    label="Add product photos"
                    multiple
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default RateProductItem;

const Skeleton = () => (
  <div className="w-full rounded-lg border border-neutral-100">
    <div className="flex items-start gap-4 p-4">
      <div className="fall shimmer-loading relative aspect-3/4 w-20 overflow-hidden rounded-md border border-neutral-100" />
      <div className="flex w-full flex-col gap-2">
        <div className="shimmer-loading h-6 w-2/3" />
        <div className="shimmer-loading h-6 w-1/3" />
      </div>
    </div>
  </div>
);
