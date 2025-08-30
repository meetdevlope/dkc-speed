import { Category, Product } from "types/product.types";
import { fetchData } from "utils/apiCaller";

export const getCategory = async (id: string): Promise<Category> => {
  return fetchData<Category>(`/product/category/${id}`, {
    errorMessage: "category-details",
    shouldNotThrowErrorOnCatch: true,
  });
};
export const getCategoryProducts = async (id: string): Promise<Product[]> => {
  return fetchData<Product[]>(`/product/category/${id}/products`, {
    errorMessage: "category-products",
    shouldNotThrowErrorOnCatch: true,
  });
};
