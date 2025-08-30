import { PaginatedResponse } from "types/baseApiTypes";
import { Category } from "types/product.types";
import { fetchDataPagination } from "utils/apiCaller";

export const getAllCategories = async (
  urlParams?: string,
): Promise<PaginatedResponse<Category>> => {
  return fetchDataPagination<Category>(
    `/product/category/list?${urlParams || ""}`,
    {
      errorMessage: "get-all-categories",
    },
  );
};
