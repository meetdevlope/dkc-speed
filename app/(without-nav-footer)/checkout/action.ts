import { OrderDetails } from "app/(with-nav-footer)/account/(with-max-width)/order-details/[id]/orderDetails.types";
import { BaseApiResponse } from "types/baseApiTypes";
import { PaymentOptionResponseType } from "types/cart.types";
import { PaymentMethodResponse } from "types/payment.types";
import { DiscountResponse } from "types/product.types";
import { fetchData } from "utils/apiCaller";

export type BaseCheckout = {
  userDeviceId: string;
  totalPayment: number;
  totalDiscount: number;
  totalCharges: number;
  finalPayment: number;
  shipmentId: string;
  totalDeposit?: number;
  couponConfig?: string;
  paymentConfig?: string;
  currencyCountry: string;
  saveAddress?: boolean;
  currencyRate: number;
};

export type CheckoutType = BaseCheckout & {
  paymentMethodId: string;
};

export type CheckoutTypeCard = BaseCheckout & {
  shippingAddress: string;
  billingAddress: string;
  stripePaymentId: string;
  saveForFuture?: boolean;
};

export const checkout = async (req: CheckoutType, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      },
    );

    if (!res.ok) {
      throw new Error(`Checkout failed with status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

interface CheckoutWithCardResponse {
  order: OrderDetails;
}

export const checkoutWithCard = async (
  req: CheckoutTypeCard,
  token: string,
): Promise<CheckoutWithCardResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/create/card`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      },
    );

    if (!res.ok) {
      throw new Error(`Checkout failed with status: ${res.status}`);
    }
    const output: BaseApiResponse<CheckoutWithCardResponse> = await res.json();
    console.log(output, "checkoutWithCard output");

    return output?.data;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

export const getPaymentMethods = async (
  token: string,
): Promise<PaymentMethodResponse[]> => {
  return fetchData<PaymentMethodResponse[]>(`/payment/method`, {
    token: token,
    errorMessage: "payment-methods",
  });
};

export const getMyDiscounts = async (
  token: string,
): Promise<DiscountResponse> => {
  return fetchData<DiscountResponse>(`/discount/my-discounts`, {
    token: token,
    errorMessage: "my-discount",
  });
};

export const getCouponDiscount = async (
  token: string,
  code: string,
): Promise<DiscountResponse> => {
  return fetchData<DiscountResponse>(`/discount/coupon-code?code=${code}`, {
    token: token,
    errorMessage: "coupon-code",
  });
};

export const getPaymentOptions =
  async (): Promise<PaymentOptionResponseType> => {
    return fetchData<PaymentOptionResponseType>(`/payment/options`, {
      errorMessage: "payment-options",
    });
  };
