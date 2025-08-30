"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardDetails from "./CardDetails";

const stripePromise = loadStripe("pk_test_0oinC7EIhA2iDgjP4TyVly4p");

type StripePaymentFormProps = {
  stripeRef?: React.RefObject<any>;
};

const StripePaymentForm: React.FC<StripePaymentFormProps> = (props) => {
  const { stripeRef } = props;

  return (
    <Elements stripe={stripePromise}>
      <CardDetails ref={stripeRef} />
    </Elements>
  );
};

export default StripePaymentForm;
