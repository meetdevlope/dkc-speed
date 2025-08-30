"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreatePaymentMethodCardData } from "@stripe/stripe-js";
import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  FormEvent,
} from "react";
import { useCheckoutStore } from "store/checkout";

export interface StripeCardDetailsRef {
  submit: (e?: FormEvent) => Promise<{
    success: boolean;
    paymentMethodId?: string;
    error?: string;
  }>;
  createPaymentMethod: () => Promise<{
    success: boolean;
    paymentMethodId?: string;
    error?: string;
  }>;
  isEmpty: () => boolean;
}

const CardDetails = forwardRef<StripeCardDetailsRef>((props, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const setPaymentMethodId = useCheckoutStore().setPaymentMethodId;

  const handleCreatePaymentMethod = async () => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet");
      return { success: false, error: "Stripe has not loaded yet" };
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found");
      setLoading(false);
      return { success: false, error: "Card element not found" };
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    } as CreatePaymentMethodCardData);
    console.log(loading, "loading");

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      setLoading(false);
      return { success: false, error: error.message || "Payment failed" };
    } else {
      setPaymentMethodId(paymentMethod.id);
      setLoading(false);
      return { success: true, paymentMethodId: paymentMethod.id };
    }
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    return await handleCreatePaymentMethod();
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    createPaymentMethod: handleCreatePaymentMethod,
    isEmpty: () => isEmpty,
  }));

  useEffect(() => {
    if (!elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const onChange = (e) => {
      setIsEmpty(e.empty);
      if (errorMessage) {
        setErrorMessage("");
      }
    };

    cardElement.on("change", onChange);

    return () => {
      cardElement.off("change", onChange);
    };
  }, [elements, errorMessage]);

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full">
      <div className="rounded-lg border border-primary-200 bg-primary-100 p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#EB1B27",
              },
            },
          }}
        />
      </div>

      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
    </form>
  );
});

CardDetails.displayName = "CardDetails";

export default CardDetails;
