import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ImageComponent } from "components/image-component/ImageComponent";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { ROUTES } from "utils/routes";
import { getAllBrands } from "./action";
import Link from "next/link";
import ProductListGrid from "components/product-list/ProductListGrid";
import SearchInputURLParam from "components/SearchInputURLParam";

const AllBrands = async (props) => {
  const { searchParams } = props;

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

  const allBrandsRes = await getAllBrands(queryParams?.toString());
  const brandsData = allBrandsRes.data;

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <Breadcrumbs breadcrumbs={breadCrumbs} />
        <ProductListGrid
          withPagination
          paginationProps={allBrandsRes?.meta}
          trailingComponent={<SearchInputURLParam />}
        >
          {brandsData?.length > 0 &&
            brandsData?.map((brand, index) => (
              <Link
                href={ROUTES.BRAND.BRAND_PRODUCTS(brand?._id || "")}
                key={index}
                className="flex flex-col gap-y-3"
              >
                <div className="relative aspect-video rounded-lg border border-neutral-50 bg-gray-light/50">
                  <ImageComponent
                    src={brand?.logo}
                    alt={brand?.name + "-alt"}
                    fill
                    className={`rounded-lg ${brand?.logo ? "m-auto max-h-20 max-w-24 md:max-w-32 lg:max-w-48" : ""}`}
                    objectFit={brand?.logo ? "contain" : "cover"}
                  />
                </div>
                <h6 className="text-center"> {brand?.name} </h6>
              </Link>
            ))}
        </ProductListGrid>
        {brandsData?.length < 1 && (
          <div className="fall w-full">
            <h6>
              {" "}
              No brands found{" "}
              {searchParams?.search ? `for - ${searchParams?.search}` : ""}{" "}
            </h6>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

const breadCrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Brands",
    href: ROUTES.BRAND.ROOT,
  },
];

export default AllBrands;
