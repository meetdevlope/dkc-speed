import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import ProductListGrid from "components/product-list/ProductListGrid";
import React from "react";
import { ROUTES } from "utils/routes";
import { getCategory, getCategoryProducts } from "./action";
import ProductCard from "components/product-card/ProductCard";
import { getSizeFromOptions } from "utils/helpers";
import MaxWidthWrapper from "components/MaxWidthWrapper";

const CategoryProductsScreen = async (props) => {
  const {
    params: { slug },
  } = props;
  const categoryProducts = await getCategoryProducts(slug);
  const categoryDetails = await getCategory(slug);

  const breadCrumbs: BreadcrumbTypes[] = [
    {
      label: "Home",
      href: ROUTES.SHOP,
    },
    {
      label: "Category",
      href: ROUTES.CATEGORY.ROOT,
    },
    {
      label: categoryDetails?.name,
      href: "",
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <Breadcrumbs breadcrumbs={breadCrumbs} />
        <h2> {categoryDetails?.name || ""} </h2>

        <div>
          <ProductListGrid>
            {categoryProducts?.map((product, index) => (
              <ProductCard
                key={index}
                image={product?.photos?.[0]}
                name={product?.name}
                price={product?.sellingPrice}
                size={getSizeFromOptions(product?.options)}
                skuId={product?.skuId}
                slug={product?.slug}
                productId={product?._id}
                eligibleForRent={product?.eligibleForRent}
                originalPrice={product?.totalPrice}
                rentPrice={product?.rentPrice}
              />
            ))}
          </ProductListGrid>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoryProductsScreen;
