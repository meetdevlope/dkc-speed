"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  getProductValuation,
  ProductValuationRequest,
  ProductValuationResponse,
} from "app/(with-nav-footer)/product-valuation/action";
import ProductConditionDropdown from "app/(with-nav-footer)/product-valuation/components/ProductConditionDropdown";
import ProductValuationResult from "app/(with-nav-footer)/product-valuation/components/ProductValuationResult";
import { Button } from "components/Button";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ROUTES } from "utils/routes";
import { z } from "zod";
import { WardrobeItem } from "../../../action";

interface WardrobeProductValuationContentProps {
  token: string;
  product: WardrobeItem;
  dialogClose?: () => void;
}

const wardrobeProductValuationSchema = z.object({
  condition: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

type WardrobeProductValuationFields = z.infer<
  typeof wardrobeProductValuationSchema
>;

const WardrobeProductValuationContent: React.FC<
  WardrobeProductValuationContentProps
> = (props) => {
  const { product, token, dialogClose } = props;

  const [hasResult, setHasResult] = useState(false);
  const [valuationResults, setValuationResults] =
    useState<ProductValuationResponse>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<WardrobeProductValuationFields>({
    resolver: zodResolver(wardrobeProductValuationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ProductValuationRequest) =>
      getProductValuation(token, data),
    onSuccess: (data) => {
      if (data) {
        setValuationResults(data);
        setHasResult(true);
        reset();
      }
    },
  });

  const onSubmit: SubmitHandler<WardrobeProductValuationFields> = (data) => {
    mutation.mutate({
      brand: product?.brand,
      condition: data?.condition?.value,
      image_url: product?.photos?.[0],
      size: product?.size,
      year_of_purchase: dayjs(product?.purchaseDate).year().toString(),
    });
  };

  const handleClose = () => {
    if (dialogClose) {
      dialogClose();
    }
    close();
    reset();
    setHasResult(false);
    setValuationResults({
      confidence_score: 0,
      original_retail_price: 0,
      suggested_resale_price: 0,
    });
  };

  return (
    <div>
      {!hasResult && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={`condition`}
            control={control}
            render={({ field }) => (
              <ProductConditionDropdown
                label="Product condition"
                onChange={(selected) => field.onChange(selected)}
                selectedOption={field.value}
                onBlur={field.onBlur}
                error={errors.condition?.message}
                helperText={errors?.condition?.message}
                isSearchable
                isPortal
                token={token}
              />
            )}
          />
          <div className="my-4 flex justify-end gap-x-2">
            <Button
              size="md"
              type="button"
              onClick={handleClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button size="md" type="submit" isLoading={mutation.isPending}>
              Find Valuation
            </Button>
          </div>
        </form>
      )}
      {hasResult && (
        <div className="space-y-8">
          <div className="rounded-lg border-2 border-gray-100 bg-gray-50/30 p-6">
            <ProductValuationResult
              response={valuationResults as ProductValuationResponse}
            />
          </div>
          {valuationResults?.suggested_resale_price ? (
            <div className="flex items-center gap-x-4">
              <Button
                onClick={handleClose}
                size="md"
                variant="outline"
                fullWidth
              >
                Maybe later
              </Button>
              <Link href={ROUTES.PRODUCTS.ORDER_DKC_BAG} className="w-full">
                <Button fullWidth size="md">
                  Order bag
                </Button>
              </Link>
            </div>
          ) : (
            <div className="my-4 flex justify-end gap-x-2">
              <Button
                size="md"
                type="button"
                onClick={handleClose}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WardrobeProductValuationContent;
