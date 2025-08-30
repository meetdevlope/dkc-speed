import { BaseApiResponse } from "types/baseApiTypes";
import { Product } from "types/product.types";

export const getImageSearchProducts = async (imageUrl: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/product/inventory/image-search",
      {
        method: "POST",
        headers: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
        }),
      },
    );

    const output: BaseApiResponse<Product[]> = await response.json();

    if (!response.ok) {
      return output?.data;
    }
    return output?.data;
  } catch (error) {
    console.log(error);
  }
};
