import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ImageComponent } from "components/image-component/ImageComponent";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { getCollections } from "./action";
import ProductListGrid from "components/product-list/ProductListGrid";
import SearchInputURLParam from "components/SearchInputURLParam";

const AllCollectionScreen = async (props) => {
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

  const { data: collections, meta } = await getCollections(
    queryParams?.toString(),
  );

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <Breadcrumbs breadcrumbs={breadCrumbs} />

        <ProductListGrid
          withPagination
          paginationProps={meta}
          trailingComponent={<SearchInputURLParam />}
        >
          {collections?.map((item, index) => (
            <Link
              href={ROUTES.COLLECTION.COLLECTION_PRODUCTS(item.slug) || "#"}
              key={index}
            >
              <div>
                <div
                  className="relative aspect-3/4 overflow-hidden rounded-lg"
                  key={index}
                >
                  <ImageComponent
                    src={item.imageUrl}
                    alt={`${item.title}-img`}
                    fill
                  />
                </div>
                <h6 className="mt-4 truncate text-center font-medium capitalize">
                  {item?.title}
                </h6>
              </div>
            </Link>
          ))}
        </ProductListGrid>
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
    label: "Collections",
    href: ROUTES.COLLECTION.ROOT,
  },
];

export default AllCollectionScreen;
