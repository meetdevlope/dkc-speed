export const revalidate = 3600;

import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import React from "react";
import { getToken } from "utils/getToken";
import { getSizeFromOptions } from "utils/helpers";
import { getWardrobeMatchingRecommendation } from "../../../action";
import { MatchingRecommendationRequest } from "../../../wardrobe.types";
import { getCountryIso } from "utils/getUserCountryIso";

interface MatchingProductsProps {
  productId: string;
}

const MatchingProducts: React.FC<MatchingProductsProps> = async (props) => {
  const { productId } = props;

  const token = getToken();
  const countryIso = getCountryIso();

  const payload: MatchingRecommendationRequest = {
    country: countryIso || "",
    productId,
  };

  const recommendationData = await getWardrobeMatchingRecommendation(
    token || "",
    payload,
  );

  return (
    <MaxWidthWrapper className="my-10 px-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {" "}
            This Will Match the Best with Your Style{" "}
          </h3>
        </div>
        <h5 className="text-gray-500">
          {" "}
          Curated pieces from our sustainable collection that pair perfectly
          with your floral dress{" "}
        </h5>
      </div>
      <ProductListGrid>
        {recommendationData?.map((product, index) => (
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
    </MaxWidthWrapper>
  );
};

export default MatchingProducts;
