export const revalidate = 3600;

import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import { getToken } from "utils/getToken";
import { getSizeFromOptions } from "utils/helpers";
import { getWardrobeRecommendationProducts } from "../../action";
import { RecommendationDetailsRequest } from "../../wardrobe.types";
import { getCountryIso } from "utils/getUserCountryIso";

const page = async (props) => {
  const { params } = props;
  const { id } = params || {};
  const token = getToken();
  const countryIso = getCountryIso();

  const payload: RecommendationDetailsRequest = {
    country: countryIso || "",
    id,
  };

  const recommendationData = await getWardrobeRecommendationProducts(
    token || "",
    payload,
  );

  const title = recommendationData?.schema?.title;
  const description = recommendationData?.schema?.description;

  return (
    <MaxWidthWrapper className="my-10 px-4">
      <div>
        <div className="flex items-center justify-between">
          {title && <h3 className="font-semibold"> {title} </h3>}
        </div>
        {description && <h5 className="text-gray-500"> {description} </h5>}
      </div>
      <ProductListGrid>
        {recommendationData?.inventoryList?.map((product, index) => (
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

export default page;
