import { BaseApiResponse } from "types/baseApiTypes";
import { fetchData } from "utils/apiCaller";

type WishlistResponse = {
  _id: string;
  items: string[];
  userId: string;
};

export const useWishlist = (token: string) => {
  const getUserWishlists = async (): Promise<WishlistResponse> => {
    return fetchData<WishlistResponse>(`/auth/wishlist`, {
      token: token,
      errorMessage: "user-wish-list",
    });
  };

  const updateWishlist = async (productId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/wishlist/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: productId,
          }),
        },
      );
      const output: BaseApiResponse<boolean> = await response.json();

      if (!response.ok) {
        throw new Error(output.message || "Failed to update wishlist");
      }

      return output.data;
    } catch (error) {
      const msg = error as string;
      throw new Error(msg);
    }
  };

  return {
    getUserWishlists,
    updateWishlist,
  };
};
