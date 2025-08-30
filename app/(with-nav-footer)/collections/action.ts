import { PaginatedResponse } from "types/baseApiTypes";
import { Collection } from "types/collection.types";
import { fetchData } from "utils/apiCaller";

export const getCollections = async (
  urlParams?: string,
): Promise<PaginatedResponse<Collection>> => {
  return fetchData<PaginatedResponse<Collection>>(
    `/product/collection/list?${urlParams || ""}`,
    {
      errorMessage: "get-all-collections",
    },
  );
};
