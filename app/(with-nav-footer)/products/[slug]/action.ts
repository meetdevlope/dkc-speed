import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import { BaseApiResponse, PaginationMeta } from "types/baseApiTypes";
import {
  DiscountResponse,
  Product,
  ProductReview,
  RentedDaysResponse,
  SizeChart,
} from "types/product.types";
import { fetchData } from "utils/apiCaller";
import { RatingBarData } from "utils/ratingsAverage";

export const getProductDetails = async (
  token: string,
  slug: string,
): Promise<Product> => {
  return fetchData<Product>(`/product/inventory/details/${slug}`, {
    token: token || "",
    errorMessage: "product-details",
    withoutToken: true,
  });
};
export const getBestOffer = async (
  token: string,
  skuId: string,
): Promise<DiscountResponse> => {
  return fetchData<DiscountResponse>(`/discount/best-offer?skuId=${skuId}`, {
    errorMessage: "best-offer",
    withoutToken: true,
  });
};

export const getSizeChart = async (id: string): Promise<SizeChart> => {
  return fetchData<SizeChart>(`/product/size-chart/${id}`, {
    errorMessage: "size-chart",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getRentedDates = async (
  token: string,
  productId: string,
): Promise<RentedDaysResponse> => {
  return fetchData<RentedDaysResponse>(
    `/product/inventory/rented-dates/${productId}`,
    {
      token: token,
      errorMessage: "rented-dates",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export const getProductReviews = async (
  skuId: string,
  params?: Record<string, string>,
): Promise<ReviewListResponseWithMetadata> => {
  return fetchData<ReviewListResponseWithMetadata>(
    `/common/review/ ${skuId}?${params?.toString() || ""}`,
    {
      errorMessage: "product-reviews",
      shouldNotThrowErrorOnCatch: true,
    },
  );
};

export type ReviewListResponseWithMetadata = {
  data: ProductReview[];
  meta: PaginationMeta;
  averageReviews: number;
  ratingsMap: RatingBarData[];
};

// export const getProductReviewss = async (
//   skuId: string,
//   params?: Record<string, string>,
// ): Promise<ReviewListResponseWithMetadata> => {
//   const urlParams = new URLSearchParams();

//   if (params) {
//     for (const [key, value] of Object.entries(params)) {
//       urlParams.append(key, value);
//     }
//   }
//   urlParams.append("usePagination", "true");

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL + "/common/review/" + skuId}?${urlParams?.toString()}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     const output: BaseApiResponse<ReviewListResponseWithMetadata> =
//       await response.json();

//     if (!response.ok) {
//       throw new Error(output?.message);
//     }

//     return output?.data;
//   } catch (error) {
//     console.log(error, `Catch: Error while Get Fetch Product reviews`);
//     throw new Error(`Fetching product reviews - ${error}`);
//   }
// };

export async function createNotification(
  token: string,
  productId: string,
): Promise<boolean> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/auth/notify/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId,
      }),
    },
  );

  const output: BaseApiResponse<boolean> = await response.json();

  if (!response.ok) {
    throw new Error(output?.message);
  }

  return output?.data;
}

export const getConfig = async (configKey: string): Promise<ConfigResponse> => {
  return fetchData<ConfigResponse>(`/common/config?name=${configKey}`, {
    errorMessage: "bag-config",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const getEnvironmentalFootprint = async (
  token: string,
  dataType: EnvironmentalFootprintTypes,
  id?: string,
): Promise<EnvironmentalFootprintResponse> => {
  let url;

  const baseUrl = `/common/environment-footprint`;

  switch (dataType) {
    case EnvironmentalFootprintTypes.PRODUCT:
      url = `${baseUrl}/product-data?productId=${id}`;
      break;
    case EnvironmentalFootprintTypes.ORDER:
      url = `${baseUrl}/order-data?orderId=${id}`;
      break;
    case EnvironmentalFootprintTypes.CART:
      url = `${baseUrl}/cart-data`;
      break;
    case EnvironmentalFootprintTypes.USER:
      url = `${baseUrl}/user-data`;
      break;
    case EnvironmentalFootprintTypes.OVERALL:
      url = `${baseUrl}/overall`;
      break;
    default:
      throw new Error("Invalid EnvironmentalFootprintType");
  }

  return fetchData<EnvironmentalFootprintResponse>(url, {
    errorMessage: "environmental-footprint",
    token: token,
  });
};

export type ConfigResponse = {
  _id: string;
  name: string;
  json: string;
  createdDate: string;
};

export type EnvironmentalFootprintResponse = {
  co2e_footprint_kg: number;
  cumulative_energy_demand_mj: number;
  water_scarcity_footprint_g_peq: number;
  eutrophication_footprint_m3: number;
};

export interface VirtualTryOnRequest {
  productImage: string;
  image: string;
}

export async function generateVirtualTryOn(
  token: string,
  req: VirtualTryOnRequest,
): Promise<string> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/common/virtual-try-on-v2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    },
  );

  const output: BaseApiResponse<string> = await response.json();

  if (!response.ok) {
    throw new Error(output?.message);
  }

  return output?.data;
}

export interface VirtualTryOnReviewRequest {
  productId: string;
  isLiked: boolean;
}
export interface VirtualTryOnReviewResponse {
  userId: string;
  productId: string;
  isLiked: boolean;
  createdDate: Date;
}

export async function virtualTryOnReview(
  token: string,
  req: VirtualTryOnReviewRequest,
): Promise<VirtualTryOnReviewResponse> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/common/virtual-try-on-review/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    },
  );

  const output: BaseApiResponse<VirtualTryOnReviewResponse> =
    await response.json();

  if (!response.ok) {
    throw new Error(output?.message);
  }

  return output?.data;
}
