import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import { Metadata, ResolvingMetadata } from "next";
import { getSizeFromOptions } from "utils/helpers";
import { ROUTES } from "utils/routes";
import { getCollectionDetails, getCollectionProducts } from "./action";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import QuickFilters from "./components/QuickFilters";
import CollectionDescription from "./components/CollectionDescription";

const CollectionProducts = async (props) => {
  const {
    params: { slug },
    searchParams,
  } = props;

  const queryParams = new URLSearchParams();

  Object.keys(searchParams).forEach((key) => {
    const values = Array.isArray(searchParams[key])
      ? searchParams[key]
      : [searchParams[key]];

    values.forEach((value) => {
      queryParams.append(key, value);
    });
  });
  queryParams.append("usePagination", "true");
  const collectionDetails = await getCollectionDetails(slug);
  const { data: collectionProducts, meta } = await getCollectionProducts(
    slug,
    queryParams?.toString(),
  );

  const { title, pageFilters, description } = collectionDetails || {};

  const breadCrumbs: BreadcrumbTypes[] = [
    {
      label: "Home",
      href: ROUTES.SHOP,
    },
    {
      label: title,
      href: "",
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <Breadcrumbs breadcrumbs={breadCrumbs} />
        <div className="fall mt-3 mb-3 flex-col gap-y-2 md:mt-5 md:mb-5 md:gap-y-4 lg:mt-6">
          <h1 className="mb-1 text-center font-primary text-xl font-bold md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {description && (
            <CollectionDescription description={description || ""} />
          )}
        </div>
        {Array.isArray(collectionProducts) &&
          collectionProducts?.length > 0 && (
            <QuickFilters quickFilters={collectionDetails?.quickFilters} />
          )}
        <div>
          <ProductListGrid
            pageFilters={pageFilters}
            paginationProps={meta}
            withPagination
            withSorting
          >
            {collectionProducts?.map((product, index) => (
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
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export async function generateMetadata(
  props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {
    params: { slug },
  } = props;

  const collectionDetails = await getCollectionDetails(slug);

  if (Object.keys(collectionDetails?.seo || {}).length < 1)
    return {
      title: "Collection Title",
      description: "Collection description",
      openGraph: {
        images: [""],
      },
    };

  const previousImages = (await parent).openGraph?.images || [];

  const title = collectionDetails?.seo?.title || collectionDetails?.title || "";

  return {
    title,
    description: collectionDetails?.seo?.description,
    keywords: collectionDetails?.seo?.metaTags,
    openGraph: {
      title,
      description: collectionDetails?.seo?.description,
      images: [collectionDetails?.imageUrl || "", ...previousImages],
      siteName: "DKC - Designers Kids Club",
      type: "website",
    },
  };
}

export default CollectionProducts;
