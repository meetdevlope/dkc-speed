"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { OrderDetails } from "app/(with-nav-footer)/account/(with-max-width)/order-details/[id]/orderDetails.types";
import { Button } from "components/Button";
import { CartTypeEnum } from "enums/cartType.enum";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BagCart, CartResponse, ProductCart } from "types/cart.types";
import { CreateProductReviewReq } from "types/product.types";
import { jsonParser } from "utils/helpers";
import { z } from "zod";
import { createProductsReview } from "../action";
import RateProductItem from "./RateProductItem";
import { useQueryClient } from "@tanstack/react-query";

type RatingWrapperProps = {
  orderDetails: OrderDetails;
  token: string;
};

const reviewSchema = z.object({
  productReviews: z.array(
    z.object({
      skuId: z.string(),
      ratings: z.number().optional(),
      description: z.string().optional(),
      images: z.array(z.string()).optional(),
      alreadyRated: z.boolean().optional(),
    }),
  ),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const RatingWrapper: React.FC<RatingWrapperProps> = ({
  orderDetails,
  token,
}) => {
  const bags: BagCart[] = jsonParser(orderDetails?.bag) || [];
  const cart: CartResponse[] = jsonParser(orderDetails?.cart) || [];
  const queryClient = useQueryClient();

  const skuIds: string[] = [
    ...cart
      .filter((item) => item.cart.type !== CartTypeEnum.bag)
      .map((item) => (item.details as ProductCart)?._id || ""),
    ...bags.flatMap((bag) => bag?.skuIds?.map(() => bag?._id || "") || []),
  ].filter(Boolean);

  const defaultValues: ReviewFormValues = {
    productReviews: skuIds.map((skuId) => ({
      skuId,
      ratings: 0,
      description: "",
      images: [],
    })),
  };

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const validReviews: CreateProductReviewReq[] = (
        data?.productReviews ?? []
      )
        .filter((review) => {
          return (
            typeof review?.ratings === "number" &&
            review.ratings > 0 &&
            !review.alreadyRated
          );
        })
        .map((review) => ({
          skuId: review.skuId as string,
          ratings: review.ratings as number,
          description: review.description as string,
          images: review.images ?? [],
          alreadyRated: review.alreadyRated,
          orderId: orderDetails?._id,
        }));

      if (validReviews.every((e) => e.alreadyRated)) {
        toast.error("All products rated, click Edit to edit your review");
        return;
      }
      if (validReviews.length === 0) {
        toast.error("Please rate at least one product");
        return;
      }

      await createProductsReview(token, validReviews);

      toast.success("Reviews submitted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["users-product-review"],
      });
    } catch (error) {
      console.error("Error submitting reviews:", error);
      toast.error("Failed to submit reviews. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          {cart?.length > 0 && (
            <>
              {cart
                .filter((item) => item.cart.type !== CartTypeEnum.bag)
                .map((item, index) => (
                  <RateProductItem
                    key={`product-${index}`}
                    img={(item?.details as ProductCart)?.image}
                    name={(item?.details as ProductCart)?.name}
                    skuId={(item?.details as ProductCart)?.skuId || ""}
                    orderId={orderDetails?._id}
                    index={index}
                    token={token || ""}
                  />
                ))}
            </>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
            size="md"
          >
            {isSubmitting ? "Submitting..." : "Submit Reviews"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RatingWrapper;
