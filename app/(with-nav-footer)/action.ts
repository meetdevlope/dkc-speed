import { BaseApiResponse, PaginatedResponse } from "types/baseApiTypes";
import {
  WidgetConfigFromAPI,
  WidgetDetailedResponse,
  WidgetMeta,
} from "types/cms/component.types";
import { Product } from "types/product.types";
import { fetchData, fetchDataPagination } from "utils/apiCaller";
import { WidgetImpl } from "./../../types/cms/component.types";
import { priceSortByTransform } from "utils/priceSortByTransform";

type ProductQueryParams = {
  seller: string;
  brand: string;
  category: string;
  search: string;
  currentPage?: string;
  pageSize?: string;
  sortBy?: string;
};

export const getInventory = async (
  params: ProductQueryParams,
): Promise<PaginatedResponse<Product>> => {
  const urlParams = new URLSearchParams();

  const {
    brand,
    category,
    search,
    seller,
    currentPage = "1",
    pageSize = "10",
    sortBy = "",
  } = params;

  if (brand) {
    urlParams.append("brand", brand);
  }
  if (category) {
    urlParams.append("category", category);
  }
  if (seller) {
    urlParams.append("seller", seller);
  }
  if (search) {
    urlParams.append("search", search);
  }
  if (currentPage) {
    urlParams.append("currentPage", currentPage);
  }
  if (pageSize) {
    urlParams.append("pageSize", pageSize);
  }
  if (sortBy) {
    urlParams.append("sortBy", sortBy);
  }
  urlParams.append("usePagination", "true");

  const queryString = priceSortByTransform(urlParams?.toString());

  return fetchDataPagination<Product>(
    `/product/inventory/query${queryString ? `?${queryString}` : ""}`,
    {
      errorMessage: "get-inventory",
      withoutToken: true,
    },
  );
};

export const getSearchProducts = async (
  search: string,
): Promise<PaginatedResponse<Product>> => {
  return fetchDataPagination<Product>(
    `/product/inventory/search/v2?search=${search}`,
    {
      errorMessage: "get-search-products",
      withoutToken: true,
    },
  );
};

export const getComponentDetails = async (
  id: string,
): Promise<BaseApiResponse<WidgetDetailedResponse>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cms/details/${id}`;

  const result: BaseApiResponse<WidgetDetailedResponse> = {
    data: {
      id: "",
      name: "",
      tag: "",
      type: "",
      imageUrl: "",
      staffId: "",
      config: {} as WidgetImpl,
    },
    success: false,
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch component details: ${response.statusText}`,
      );
    }

    const apiResponse: BaseApiResponse<{
      cms: WidgetMeta;
      details: WidgetConfigFromAPI;
    }> = await response.json();

    if (apiResponse.data) {
      const apiData = apiResponse.data;
      result.data = {
        id: apiData.cms._id,
        config: JSON.parse(apiData.details.configJson),
        imageUrl: apiData.cms.imageUrl,
        name: apiData.cms.name,
        staffId: apiData.cms.staffId,
        tag: apiData.cms.tag,
        type: apiData.cms.type,
      };
      result.message = "";
    } else {
      console.log("No config found");
    }
  } catch (error) {
    console.log(error, "Catch error get component details");
  }

  return result;
};

export const getSearchSuggestions = async (
  searchQuery: string,
): Promise<string[]> => {
  return fetchData<string[]>(
    `/product/inventory/suggestion/v2?query=${searchQuery}`,
    {
      errorMessage: "search=product",
    },
  );
};
export const getProductRecommendation = async (
  deviceID: string,
  token?: string,
): Promise<Product[]> => {
  return fetchData<Product[]>(
    `/product/inventory/recommendation?userDeviceId=${deviceID}`,
    {
      token: token || "",
      withoutToken: !token,
      errorMessage: "product-recommendation",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const userViewedProduct = async (
  deviceID: string,
  productId: string,
  token?: string,
): Promise<boolean> => {
  return fetchData<boolean>(
    `/product/inventory/user-viewed/${productId}?userDeviceId=${deviceID}`,
    {
      token: token || "",
      withoutToken: !token,
      errorMessage: "user-viewed-product",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};
