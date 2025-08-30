"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import FileUploader from "components/FileUploader";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import { Input } from "components/Input";
import CustomSelect, { DropdownOption } from "components/Select";
import Spinner from "components/spinner/Spinner";
import useImageUpload from "hooks/useImageUpload";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Brand } from "types/brand.types";
import { z } from "zod";
import { getProductValuation, ProductValuationResponse } from "../action";
import ProductValuationResult from "../components/ProductValuationResult";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import ProductConditionDropdown from "./ProductConditionDropdown";

const singleProductSchema = z.object({
  image_url: z.string().min(1, "Product image is required"),
  brand: z.string().min(1, "Brand is required"),
  size: z.string().min(1, "Size is required"),
  condition: z.object({
    label: z.string(),
    value: z.string(),
  }),
  year_of_purchase: z
    .string()
    .min(4, "Year of purchase is required")
    .max(4, "Please enter a valid year"),
});

const multiProductValuationSchema = z.object({
  products: z
    .array(singleProductSchema)
    .min(1, "At least one product is required"),
});

type SingleProductForm = z.infer<typeof singleProductSchema>;
type MultiProductValuationForm = z.infer<typeof multiProductValuationSchema>;

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  imageUrl?: string;
  error?: string;
  productIndex: number;
}

interface ProductValuationProps {
  token: string;
  sizeList: string[];
  brandList: Brand[];
  conditionList: string[];
}

export interface ProductResult {
  productIndex: number;
  result: ProductValuationResponse;
  productName: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  imageUrl,
  error,
  productIndex,
}) => {
  const { uploadImage, progress, isUploading } = useImageUpload();

  const handleFileUpload = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    uploadImage.mutate(file, {
      onSuccess: (url) => {
        onImageUpload(url);
      },
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-center text-sm font-medium text-gray-900">
        {imageUrl
          ? "Image uploaded successfully"
          : "Upload image of your product"}
      </label>

      <div className="flex min-h-[200px] items-center justify-center">
        {imageUrl ? (
          <div className="relative mx-auto w-fit">
            <Zoom
              zoomImg={{
                src: imageUrl,
                alt: `zoom-product-${productIndex}-alt`,
              }}
            >
              <ImageComponent
                src={imageUrl}
                height={200}
                width={200}
                alt={`product-${productIndex}-alt`}
                className="mx-auto cursor-zoom-in rounded-sm"
              />
            </Zoom>
            <button
              type="button"
              className="absolute -top-3 -right-3 cursor-pointer rounded-full border-2 border-white bg-gray-50 p-0.5 hover:bg-gray-100"
              onClick={() => onImageUpload("")}
            >
              <Icon name="close" iconType="stroke" size={20} />
            </button>
          </div>
        ) : (
          <div className="w-full">
            {isUploading ? (
              <div className="py-16 text-center">
                <Spinner />
                <p className="mt-2 text-sm text-gray-600">
                  Uploading... {progress}%
                </p>
              </div>
            ) : (
              <FileUploader onFilesSelected={handleFileUpload} />
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

const ProductValuationMain: React.FC<ProductValuationProps> = (props) => {
  const { token, brandList, sizeList } = props;
  const [valuationResults, setValuationResults] = useState<ProductResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MultiProductValuationForm>({
    resolver: zodResolver(multiProductValuationSchema),
    defaultValues: {
      products: [
        {
          image_url: "",
          brand: "",
          size: "",
          condition: {},
          year_of_purchase: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");

  const getProductName = (index: number) => {
    const product = watchedProducts[index];
    if (!product) return `Product ${index + 1}`;

    const brandName = brandList.find((b) => b._id === product.brand)?.name;
    const size = product.size;

    if (brandName && size) {
      const baseName = `${brandName} - ${size}`;
      const duplicateCount = watchedProducts.slice(0, index).filter((p) => {
        const pBrandName = brandList.find((b) => b._id === p.brand)?.name;
        return pBrandName === brandName && p.size === size;
      }).length;

      return duplicateCount > 0
        ? `${baseName} (${duplicateCount + 1})`
        : baseName;
    }

    return `Product ${index + 1}`;
  };

  const valuationMutation = useMutation({
    mutationFn: async (products: SingleProductForm[]) => {
      const results: ProductResult[] = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        try {
          const result = await getProductValuation(token, {
            ...product,
            condition: product?.condition?.value,
          });
          results.push({
            productIndex: i,
            result,
            productName: getProductName(i),
          });
        } catch (error) {
          console.error(`Error valuating product ${i + 1}:`, error);
          throw error;
        }
      }

      return results;
    },
    onSuccess: (data) => {
      setValuationResults(data);
    },
  });

  const onSubmit = (data: MultiProductValuationForm) => {
    setIsSubmitting(true);
    valuationMutation.mutate(data.products, {
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleImageUpload = (index: number) => (url: string) => {
    setValue(`products.${index}.image_url`, url);
  };

  const addProduct = () => {
    append({
      image_url: "",
      brand: "",
      size: "",
      condition: {
        label: "",
        value: "",
      },
      year_of_purchase: "",
    });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const resetForm = () => {
    setValuationResults([]);
    reset({
      products: [
        {
          image_url: "",
          brand: "",
          size: "",
          condition: {
            label: "",
            value: "",
          },
          year_of_purchase: "",
        },
      ],
    });
  };

  const brandOptions: DropdownOption[] = brandList?.map((brand) => ({
    label: brand.name,
    value: brand._id || "",
  }));

  const sizeOptions: DropdownOption[] = sizeList?.map((size) => ({
    label: size,
    value: size,
  }));

  const hasResults = valuationResults.length > 0;

  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-primary-200 bg-white p-4 md:p-8 lg:p-10">
      <div className="mx-auto mb-6 max-w-2xl">
        {!hasResults ? (
          <div>
            <div className="mb-1 flex items-center justify-center gap-2">
              <h3 className="text-gray-900">Product Valuation</h3>
            </div>
            <p className="text-center text-gray-600">
              Get instant estimates for your items&apos; resale values
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Valuation Complete
            </h3>
            <p className="text-gray-600">
              Here&apos;s what your items could be worth
            </p>
          </div>
        )}
      </div>

      {!hasResults ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative rounded-lg border-2 border-gray-100 bg-gray-50/30 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h5 className="font-semibold text-gray-900">
                  {getProductName(index)}
                </h5>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="cursor-pointer rounded-md bg-gray-50 p-1 text-red-600 hover:bg-gray-100"
                  >
                    <Icon name="trash" iconType="stroke" size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <ImageUpload
                  onImageUpload={handleImageUpload(index)}
                  imageUrl={watchedProducts[index]?.image_url}
                  error={errors.products?.[index]?.image_url?.message}
                  productIndex={index}
                />

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                  <div>
                    <Controller
                      name={`products.${index}.brand`}
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="Brand"
                          options={brandOptions}
                          selectedOption={
                            brandOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(selected) => {
                            field.onChange(
                              (selected as DropdownOption)?.value || "",
                            );
                          }}
                          onBlur={field.onBlur}
                          error={errors.products?.[index]?.brand}
                          helperText={errors.products?.[index]?.brand?.message}
                          isSearchable={true}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`products.${index}.size`}
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="Size"
                          options={sizeOptions}
                          selectedOption={
                            sizeOptions.find(
                              (option) => option.value === field.value,
                            ) || null
                          }
                          onChange={(selected) => {
                            field.onChange(
                              (selected as DropdownOption)?.value || "",
                            );
                          }}
                          onBlur={field.onBlur}
                          error={errors.products?.[index]?.size}
                          helperText={errors.products?.[index]?.size?.message}
                          isSearchable={false}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                  <div>
                    <Controller
                      name={`products.${index}.condition`}
                      control={control}
                      render={({ field }) => (
                        <ProductConditionDropdown
                          label="Product Condition"
                          onChange={(selected) => field.onChange(selected)}
                          selectedOption={field.value}
                          onBlur={field.onBlur}
                          error={errors.products?.[index]?.condition}
                          helperText={
                            errors.products?.[index]?.condition?.message
                          }
                          isSearchable
                          isPortal
                          token={token}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`products.${index}.year_of_purchase`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Year of Purchase"
                          type="text"
                          placeholder="e.g. 2023"
                          maxLength={4}
                        />
                      )}
                    />
                    {errors.products?.[index]?.year_of_purchase && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.products[index]?.year_of_purchase?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={addProduct}
              size="md"
              variant="outline"
              startIcon={
                <Icon
                  name="plus"
                  iconType="stroke"
                  size={16}
                  className="stroke-2"
                />
              }
            >
              Add Product
            </Button>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting || valuationMutation.isPending}
            isLoading={isSubmitting || valuationMutation.isPending}
          >
            {isSubmitting || valuationMutation.isPending ? (
              <>Calculating values...</>
            ) : (
              <>
                Get Valuations ({fields.length}{" "}
                {fields.length === 1 ? "item" : "items"})
              </>
            )}
          </Button>

          {valuationMutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-red-800">
                <p className="font-medium">Something went wrong</p>
              </div>
              <p className="mt-1 text-red-600">
                We couldn&apos;t process your valuation request. Please try
                again.
              </p>
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-8">
          {valuationResults.map((productResult, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-gray-100 bg-gray-50/30 p-6"
            >
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                {productResult.productName}
              </h4>
              <ProductValuationResult response={productResult.result} />
            </div>
          ))}
          <div className="flex items-center gap-x-4">
            <Button onClick={resetForm} size="md" variant="outline" fullWidth>
              Value More Items
            </Button>
            <Link href={ROUTES.PRODUCTS.ORDER_DKC_BAG} className="w-full">
              <Button fullWidth size="md">
                Order bag
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductValuationMain;
