import { PaginatedResponse } from "types/baseApiTypes";
import { Collection } from "types/collection.types";
import { Product } from "types/product.types";
import { fetchData, fetchDataPagination } from "utils/apiCaller";
import { priceSortByTransform } from "utils/priceSortByTransform";

export const getCollectionDetails = async (
  slug: string,
): Promise<Collection> => {
  return fetchData<Collection>(`/product/collection/details/${slug}`, {
    errorMessage: "get-collection-details",
  });
};
export const getCollectionProducts = async (
  slug: string,
  urlParams?: string,
): Promise<PaginatedResponse<Product>> => {
  const queryString = priceSortByTransform(urlParams || "");

  return fetchDataPagination<Product>(
    `/product/collection/${slug}/products${queryString ? `?${queryString}` : ""}`,
    {
      errorMessage: "get-collection-products",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};
