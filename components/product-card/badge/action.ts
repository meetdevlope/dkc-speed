import { ProductBadge } from "types/product.types";
import { fetchData } from "utils/apiCaller";

export const getProductBadge = async (
  productId: string,
): Promise<ProductBadge[]> => {
  return fetchData<ProductBadge[]>(`/product/badge/${productId}`, {
    errorMessage: "product-badge",
    shouldNotThrowErrorOnCatch: true,
  });
};
