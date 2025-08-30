import toast from "react-hot-toast";
import { PaginatedResponse } from "types/baseApiTypes";
import { Product } from "types/product.types";
import { fetchDataPagination } from "utils/apiCaller";

export const getMyItems = async (
  token: string,
): Promise<PaginatedResponse<Product>> => {
  return fetchDataPagination<Product>(`/auth/my-items`, {
    token: token,
    errorMessage: "my-items",
  });
};

export const updateRentCondition = async (
  token: string,
  id: string,
): Promise<boolean | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/product/inventory/update-rent-condition/${id}`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error(`Failed to update rent condition: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Updated successfully!");
    return output.data;
  } catch (error) {
    toast.error("An error occurred while updating rent condition.");
    console.error("Error adding rent condition:", error);
    return null;
  }
};
