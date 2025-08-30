import ProductCard from "components/product-card/ProductCard";
import ProductListSlider from "components/product-list/ProductListSlider";
import SectionTitle from "components/SectionTitle";
import { cookies } from "next/headers";
import { Product } from "types/product.types";
import { getToken } from "utils/getToken";
import { getSizeFromOptions, jsonParser } from "utils/helpers";
import { RVUtil } from "utils/recentlyViewed";
import { getProductDetails } from "../../[slug]/action";

const fetchAllProducts = async (token: string, allProductIds: string[]) => {
  const productData: Product[] = [];

  for (const productId of allProductIds) {
    try {
      const data = await getProductDetails(token, productId);
      productData.push(data);
    } catch (error) {
      console.log(error);
    }
  }

  return productData;
};

const RecentlyViewed = async () => {
  const token = getToken();

  const allProductIdsString = cookies().get(RVUtil.cookieName)?.value;

  if (!allProductIdsString) return null;

  const allProductIds = jsonParser(allProductIdsString, "recently-viewed");

  const allRVProducts = await fetchAllProducts(token || "", allProductIds);

  if (!allRVProducts || allRVProducts.length < 1) return <></>;

  return (
    <section className="px-4 pt-10 md:pt-16 lg:pt-20">
      <SectionTitle title="Recently Viewed" />
      <div className="mt-6 md:mt-12">
        <ProductListSlider>
          {allRVProducts?.map((product, index) => (
            <div key={index}>
              {product?.name && (
                <div className="min-w-[220px] md:min-w-[272px]">
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
              )}
            </div>
          ))}
        </ProductListSlider>
      </div>
    </section>
  );
};

export default RecentlyViewed;
