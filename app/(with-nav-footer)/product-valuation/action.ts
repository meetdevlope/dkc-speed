import { OptionTypeEnum } from "enums/optionType.enum";
import { BaseApiResponse } from "types/baseApiTypes";
import { fetchData } from "utils/apiCaller";

export const getOptionsList = async (token: string): Promise<OptionsType[]> => {
  return fetchData<OptionsType[]>(`/product/option/list`, {
    errorMessage: "options-list",
    token: token || "",
  });
};

export async function getProductValuation(
  token: string,
  req: ProductValuationRequest,
): Promise<ProductValuationResponse> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/common/valuation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    },
  );

  const output: BaseApiResponse<ProductValuationResponse> =
    await response.json();

  if (!response.ok) {
    throw new Error(output?.message);
  }

  return output?.data;
}

export interface ProductValuationRequest {
  image_url: string;
  brand: string;
  size: string;
  condition: string;
  year_of_purchase: string;
}
export interface ProductValuationResponse {
  suggested_resale_price: number;
  confidence_score: number;
  original_retail_price: number;
}

export interface OptionsType {
  _id?: string;
  __v?: string;
  title?: string;
  active?: boolean;
  required?: boolean;
  value?: string;
  valueArr?: string[];
  optionType: OptionTypeEnum;
  optionId?: string;
}
