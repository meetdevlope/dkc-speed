import { getProductRecommendation } from "app/(with-nav-footer)/action";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductCard from "components/product-card/ProductCard";
import ProductListSlider from "components/product-list/ProductListSlider";
import SectionTitle from "components/SectionTitle";
import React from "react";
import { getSizeFromOptions } from "utils/helpers";

type ProductRecommendationProps = {
  token: string;
  deviceId: string;
};

const ProductRecommendation: React.FC<ProductRecommendationProps> = async (
  props,
) => {
  const { token, deviceId } = props;

  const productRecommendations = await getProductRecommendation(
    deviceId,
    token,
  );

  return (
    <MaxWidthWrapper>
      <section className="px-4 pt-8 md:pt-12 lg:pt-16">
        <SectionTitle title="Recommended Products" />
        <div className="mt-6">
          <ProductListSlider>
            {productRecommendations?.map((product, index) => (
              <div className="min-w-[272px]" key={index}>
                <ProductCard
                  image={product?.photos?.[0]}
                  name={product?.name}
                  price={product?.sellingPrice}
                  size={getSizeFromOptions(product?.options)}
                  skuId={product?.skuId}
                  slug={product?.slug}
                  productId={product?._id}
                  eligibleForRent={product?.eligibleForRent}
                  maxWidth={280}
                  originalPrice={product?.totalPrice}
                  rentPrice={product?.rentPrice}
                />
              </div>
            ))}
          </ProductListSlider>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default ProductRecommendation;
