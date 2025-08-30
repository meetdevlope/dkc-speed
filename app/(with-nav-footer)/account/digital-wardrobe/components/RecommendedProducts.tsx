export const revalidate = 3600;

import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import React from "react";
import { getToken } from "utils/getToken";
import { getSizeFromOptions } from "utils/helpers";
import {
  getWardrobeRecommendations,
  WardrobeRecommendationParams,
} from "../action";
import {
  RecommendationListRequest,
  RecommendationTypeEnum,
} from "../wardrobe.types";
import WardrobeProduct from "./wardrobe-items/WardrobeItem";
import { Button } from "components/Button";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { getCountryIso } from "utils/getUserCountryIso";

interface RecommendedProductsProps extends WardrobeRecommendationParams {
  title?: string;
  description?: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = async () => {
  const token = getToken();
  const countryIso = getCountryIso();

  const payload: RecommendationListRequest = {
    country: countryIso || "",
    limit: 4,
    source: ["ai"],
    aiRecommendationType: [
      RecommendationTypeEnum.location_or_festive,
      RecommendationTypeEnum.seasonal_or_occasional,
      RecommendationTypeEnum.style_base,
      RecommendationTypeEnum.trendy,
    ],
  };

  const recommendationData = await getWardrobeRecommendations(
    token || "",
    payload,
  );

  return (
    <MaxWidthWrapper>
      {recommendationData?.map((item, index) => {
        const title = item?.schema?.title;
        const description = item?.schema?.description;

        return (
          <div key={index} className="my-6 px-4 md:my-12 lg:my-16">
            <div>
              <div className="flex items-center justify-between">
                {title && <h3 className="font-semibold"> {title} </h3>}
                <Link
                  href={ROUTES.ACCOUNT.DIGITAL_WARDROBE.WARDROBE_RECOMMENDATION_PRODUCTS(
                    item?.schema?.id,
                  )}
                >
                  <Button size="sm" variant="ghost">
                    See more
                  </Button>
                </Link>
              </div>
              {description && (
                <h5 className="text-gray-500"> {description} </h5>
              )}
            </div>
            {Array.isArray(item.wardrobeItemList) &&
              item.wardrobeItemList?.length > 0 && (
                <ProductListGrid withHeader={false}>
                  {item.wardrobeItemList?.map((product, index) => (
                    <WardrobeProduct
                      key={index}
                      {...product}
                      purchasePrice={10}
                      size="8"
                      createdDate={new Date(product.createdDate)}
                    />
                  ))}
                </ProductListGrid>
              )}

            {Array.isArray(item.inventoryList) &&
              item.inventoryList?.length > 0 && (
                <ProductListGrid withHeader={false}>
                  {item.inventoryList?.map((product, index) => (
                    <ProductCard
                      key={index}
                      image={product?.photos?.[0]}
                      name={product?.name}
                      price={product?.sellingPrice}
                      size={getSizeFromOptions(product.options)}
                      skuId={product?.skuId}
                      slug={product?.slug}
                      productId={product?._id}
                      eligibleForRent={product?.eligibleForRent}
                      originalPrice={product?.totalPrice}
                      rentPrice={product?.rentPrice}
                      productStatus={product?.productStatus}
                    />
                  ))}
                </ProductListGrid>
              )}
          </div>
        );
      })}
    </MaxWidthWrapper>
  );
};

export default RecommendedProducts;
