import { getMyDiscounts } from "app/(without-nav-footer)/checkout/action";
import { useCartStore } from "store/cart";
import { BaseApiResponse } from "types/baseApiTypes";
import {
  AddToCartRequest,
  CartResponse,
  EditQuantityRequest,
} from "types/cart.types";

const defaultDiscountResponse = {
  discountTitle: "",
  discountMap: {},
};

const setCartStore = async (data: CartResponse[], token: string) => {
  try {
    const isAuthenticated = Boolean(data?.[0].cart?.userId);

    const myDiscounts =
      isAuthenticated && data.length > 0
        ? await getMyDiscounts(token)
        : defaultDiscountResponse;

    useCartStore.setState({ data, myDiscounts });
  } catch (error) {
    console.log(error, "error while setting updated price to cart");
  }
};

export const useCart = (token: string, deviceId: string) => {
  const getCart = async (): Promise<CartResponse[] | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/get?userDeviceId=${deviceId}`,
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      );
      const output: BaseApiResponse<CartResponse[]> = await res.json();

      if (!res.ok) {
        throw new Error(output.message || "Failed to add item to cart");
      }

      const data = output?.data;

      if (data) {
        setCartStore(data, token);
      }
      return data;
    } catch (error) {
      console.log(error, "Error while fetching cart");
      throw new Error("Failed to get cart");
    }
  };

  const addToCart = async (
    req: AddToCartRequest,
  ): Promise<AddToCartRequest | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/create`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        },
      );
      const response: BaseApiResponse<AddToCartRequest> = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Failed to add item to cart");
      }
      return response.data;
    } catch (error) {
      const msg = error as string;
      throw new Error(msg);
    }
  };

  const deleteCart = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to delete item to cart");
      }
    } catch (error) {
      console.log(error, "delete item error");
      throw new Error("Failed to delete item to cart");
    }
  };

  const updateQuantity = async (req: EditQuantityRequest) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart/update/quantity`,
        {
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        },
      );
      if (!res.ok) {
        throw new Error("Failed to update item quantity");
      }
    } catch (error) {
      console.log(error, "update quantity error");
      throw new Error("Failed to update item quantity");
    }
  };

  return {
    getCart,
    addToCart,
    deleteCart,
    updateQuantity,
  };
};
