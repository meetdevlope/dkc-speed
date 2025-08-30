import { PaginatedResponse } from "types/baseApiTypes";
import { Brand } from "types/brand.types";
import { fetchDataPagination } from "utils/apiCaller";

export const getAllBrands = async (
  urlParams?: string,
): Promise<PaginatedResponse<Brand>> => {
  return fetchDataPagination<Brand>(`/brand/list?${urlParams || ""}`, {
    errorMessage: "get-all-brands",
  });
};
