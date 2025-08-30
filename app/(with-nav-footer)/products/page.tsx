import BackButton from "components/BackButton";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductCard from "components/product-card/ProductCard";
import ProductListGrid from "components/product-list/ProductListGrid";
import dynamic from "next/dynamic";
import { PaginatedResponse } from "types/baseApiTypes";
import { Product } from "types/product.types";
import { getSizeFromOptions } from "utils/helpers";
import { getInventory, getSearchProducts } from "../action";
import { getBrandDetails } from "../brand/[id]/action";
import { getCategory } from "../category/[slug]/action";
const TrustBadges = dynamic(
  () => import("../../(with-nav-footer)/shop/components/TrustBadges"),
);
const BrandsSlider = dynamic(
  () => import("../../(with-nav-footer)/shop/components/brand/BrandsSlider"),
);

const ProductsScreen = async (props) => {
  const { searchParams } = props;
  const key = Object.keys(searchParams || {})?.[0];

  let inventoryRes: PaginatedResponse<Product>;

  if (key === "search") {
    inventoryRes = await getSearchProducts(searchParams?.search);
  } else {
    inventoryRes = await getInventory({
      seller: searchParams?.seller,
      brand: searchParams?.brand,
      category: searchParams?.category,
      search: searchParams?.search,
      currentPage: searchParams?.currentPage,
      pageSize: searchParams?.pageSize,
      sortBy: searchParams?.sortBy,
    });
  }

  const getTitle = async () => {
    let title = "All Products";

    if (key === "brand") {
      const data = await getBrandDetails(searchParams["brand"]);
      title = data?.name || title;
    } else if (key === "seller") {
      title = "Seller";
    } else if (key === "search") {
      title = decodeURIComponent(searchParams?.search);
    } else if (key === "category") {
      const data = await getCategory(searchParams["category"]);
      title = data?.name || title;
    }

    return (
      <PageTitle
        title={title}
        totalItems={
          inventoryRes?.data?.length < 1 ? 0 : inventoryRes?.meta?.totalRows
        }
      />
    );
  };

  const pageTitle = await getTitle();

  return (
    <div>
      {pageTitle}
      <MaxWidthWrapper>
        <div className="p-4">
          <ProductListGrid
            withPagination={inventoryRes?.data?.length > 0}
            paginationProps={inventoryRes?.meta}
            withSorting
          >
            {inventoryRes?.data?.map((product, index) => (
              <ProductCard
                image={product?.photos[0]}
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
        </div>
        <BrandsSlider />
        <TrustBadges />
      </MaxWidthWrapper>
    </div>
  );
};

const PageTitle = ({
  title,
  totalItems,
}: {
  title: string;
  totalItems?: number;
}) => (
  <div className="mt-[0.8px] w-full gap-x-2 bg-neutral-500 px-4 py-2">
    <MaxWidthWrapper className="flex items-center justify-between">
      <div>
        <h6 className="mb-1 font-medium text-nowrap text-white capitalize">
          {title}
        </h6>
        <p className="text-neutral-300">
          Your search results • {totalItems} items
        </p>
      </div>
      <BackButton className="text-sm text-neutral-300" textOnly />
    </MaxWidthWrapper>
  </div>
);

export default ProductsScreen;
