import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import { getSizeFromOptions } from "utils/helpers";
import { getImageSearchProducts } from "./action";
import BackButton from "components/BackButton";
import { ImageComponent } from "components/image-component/ImageComponent";
import MaxWidthWrapper from "components/MaxWidthWrapper";

const ImageSearchScreen = async (params) => {
  const {
    searchParams: { imageUrl },
  } = params;

  const searchedProducts = await getImageSearchProducts(imageUrl);

  return (
    <div>
      <ResultsQuery img={imageUrl} />
      <div className="p-4">
        <MaxWidthWrapper>
          <ProductListGrid>
            {searchedProducts?.map((product, index) => (
              <ProductCard
                image={product?.photos?.[0]}
                name={product?.name}
                price={product?.sellingPrice}
                size={getSizeFromOptions(product?.options)}
                slug={product?.slug}
                eligibleForRent={product?.eligibleForRent}
                key={index}
                originalPrice={product?.totalPrice}
                skuId={product?.skuId}
                productId={product?._id}
                rentPrice={product?.rentPrice}
              />
            ))}
          </ProductListGrid>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

const ResultsQuery = ({
  img = "",
  title,
  totalItems,
}: {
  img: string;
  title?: string;
  totalItems?: number;
}) => (
  <div className="mt-[0.8px] w-full gap-x-2 bg-neutral-500 px-4 py-2">
    <MaxWidthWrapper className="flex items-center gap-x-4">
      <ImageComponent
        src={img}
        width={34}
        height={34}
        objectFit="cover"
        alt={title + "-image-search-results"}
        className="rounded"
      />

      <p className="text-neutral-300">
        {Number(totalItems) > 0
          ? "Your search results • {totalItems} items"
          : "Your image search results"}
      </p>
      <BackButton className="ml-auto text-sm text-neutral-300" textOnly />
    </MaxWidthWrapper>
  </div>
);

export default ImageSearchScreen;
