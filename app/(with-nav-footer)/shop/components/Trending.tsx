import { getCollectionProducts } from "app/(with-nav-footer)/collections/[slug]/action";
import GreenLabel from "components/GreenLabel";
import ProductCard from "components/product-card/ProductCard";
import ProductListSlider from "components/product-list/ProductListSlider";
import SectionTitle from "components/SectionTitle";
import TopBorderText from "components/TopBorderText";
import { getSizeFromOptions } from "utils/helpers";
import { ROUTES } from "utils/routes";

const collectionName = "trending";

type TrendingProps = {
  limit?: number;
};

const Trending: React.FC<TrendingProps> = async (props) => {
  const { limit } = props;

  const { data: trendingProducts } =
    await getCollectionProducts(collectionName);

  const productsToMap = limit
    ? trendingProducts.slice(0, limit)
    : trendingProducts;

  return (
    <section className="p-4">
      <div className="fall flex-col">
        <GreenLabel>TRENDING NOW</GreenLabel>
        <SectionTitle title="BUZZWORTHY BUYS" className="mt-2 mb-7" />
      </div>
      <ProductListSlider>
        {productsToMap?.map((item, index) => {
          return (
            <div className="min-w-[220px]" key={index}>
              <ProductCard
                productId={item._id}
                image={item?.photos?.[0]}
                name={item?.name}
                price={item?.sellingPrice}
                size={getSizeFromOptions(item?.options)}
                slug={item?.slug}
                skuId={item?.skuId}
                wishlistNumber={item?.wishlistNumber}
                eligibleForRent={item?.eligibleForRent}
                originalPrice={item?.totalPrice}
                maxWidth={220}
                rentPrice={item?.rentPrice}
              />
            </div>
          );
        })}
      </ProductListSlider>
      <div className="fall mt-8">
        <TopBorderText
          href={ROUTES.COLLECTION.COLLECTION_PRODUCTS(collectionName)}
        >
          View all
        </TopBorderText>
      </div>
    </section>
  );
};

export default Trending;
