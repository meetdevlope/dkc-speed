import { Brand } from "types/brand.types";
import { fetchData } from "utils/apiCaller";

export const getBrandDetails = async (brandId: string): Promise<Brand> => {
  return fetchData<Brand>(`/brand/details/${brandId}`, {
    errorMessage: "brand-details",
    shouldNotThrowErrorOnCatch: true,
  });
};
