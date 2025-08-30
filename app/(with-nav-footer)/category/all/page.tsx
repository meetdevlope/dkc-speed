import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ImageComponent } from "components/image-component/ImageComponent";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductListGrid from "components/product-list/ProductListGrid";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { getAllCategories } from "./action";
import SearchInputURLParam from "components/SearchInputURLParam";

const AllCategoriesScreen = async (props) => {
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

  const allCategoriesRes = await getAllCategories(queryParams?.toString());
  const allCategoriesData = allCategoriesRes?.data;

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <Breadcrumbs breadcrumbs={breadCrumbs} />
        <ProductListGrid
          withPagination
          paginationProps={allCategoriesRes?.meta}
          trailingComponent={<SearchInputURLParam />}
        >
          {allCategoriesData?.length > 0 &&
            allCategoriesData?.map((category, index) => (
              <Link
                href={ROUTES.CATEGORY.CATEGORY_PRODUCTS(category?._id)}
                key={index}
              >
                <div
                  className="relative aspect-3/4 overflow-hidden rounded-lg"
                  key={index}
                >
                  <ImageComponent
                    src={category?.imageUrl}
                    alt={`${category.name}-alt`}
                    fill
                  />
                </div>
                <h6 className="mt-4 truncate text-center font-medium capitalize">
                  {category.name}
                </h6>
              </Link>
            ))}
        </ProductListGrid>
        {allCategoriesData?.length < 1 && (
          <div className="fall w-full">
            <h6>
              {" "}
              No categories found{" "}
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
    label: "Category",
    href: ROUTES.CATEGORY.ROOT,
  },
];

export default AllCategoriesScreen;
