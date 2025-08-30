import toast from "react-hot-toast";
import {
  CreateProductReviewReq,
  EditProductReviewReq,
  ProductReview,
} from "types/product.types";
import { fetchData } from "utils/apiCaller";

export const createProductsReview = async (
  token: string,
  bodies: CreateProductReviewReq[],
): Promise<ProductReview[]> => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/common/review/create`;

    const requests = bodies.map((body) =>
      fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
          }
          return response.json();
        })
        .then((output) => output?.data as ProductReview),
    );

    const reviews = await Promise.all(requests);

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const getUsersProductReview = async (
  token: string,
  skuId: string,
  orderId: string,
): Promise<ProductReview> => {
  return fetchData<ProductReview>(`/common/review/${skuId}/user/${orderId}`, {
    token: token,
    errorMessage: "users-product-review",
    shouldNotThrowErrorOnCatch: true,
  });
};

export const editProductReview = async (
  token: string,
  reviewId: string,
  body: EditProductReviewReq,
): Promise<ProductReview | null> => {
  const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/common/review/edit/${reviewId}`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      toast.error(`Failed to edit review: ${response.statusText}`);
      return null;
    }

    const output = await response.json();

    if (!output || !output.data) {
      toast.error("Invalid response data.");
      return null;
    }

    toast.success("Review edited successfully!");
    return output.data as ProductReview;
  } catch (error) {
    toast.error("An error occurred while editing the review.");
    console.error("Error editing review:", error);
    return null;
  }
};
