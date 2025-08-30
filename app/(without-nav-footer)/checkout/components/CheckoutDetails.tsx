import { useMutation } from "@tanstack/react-query";
import { AddressFormHandle } from "components/address/AddressForm";
import { Button } from "components/Button";
import { totalDepositKey } from "components/cart/CartTotal";
import CountryDropdown from "components/CountryDropdown";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import OrDivider from "components/OrDivider";
import PageHeader from "components/PageHeader";
import Spinner from "components/spinner/Spinner";
import { useGetTaxAndCharges } from "hooks/queries/useGetTaxAndCharges";
import { useCartUIConfigLoader } from "hooks/useCartConfig";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "store/cart";
import { useCheckoutStore } from "store/checkout";
import { useLocalizationStore } from "store/localizationStore";
import { PaymentOptionType, ProductCart } from "types/cart.types";
import { DiscountResponse } from "types/product.types";
import CartUtils, { ExtraChargesModel } from "utils/cartTotal";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { RentUtils } from "utils/rent";
import { ROUTES } from "utils/routes";
import {
  BaseCheckout,
  checkout,
  CheckoutType,
  CheckoutTypeCard,
  checkoutWithCard,
} from "../action";
import { StripeCardDetailsRef } from "./CardDetails";
import CheckoutAddress from "./CheckoutAddress";
import DeliveryOptions from "./DeliveryOptions";
import ExpressCheckout from "./ExpressCheckout";
import OrderSummaryMobile from "./OrderSummaryMobile";
import PayLaterOptions from "./PayLaterOptions";
import PaymentOptions from "./PaymentOptions";
import { PRE_ORDER_TIME_TEXT } from "utils/helpers";
import ErrorText from "components/ErrorText";

type CheckoutDetailsProps = {
  token: string;
  deviceId: string;
  setCouponConfig: React.Dispatch<SetStateAction<DiscountResponse>>;
  couponConfig: DiscountResponse;
};

const creditCardKey = "Credit/Debit Card";

const CheckoutDetails: React.FC<CheckoutDetailsProps> = (props) => {
  const { token, deviceId, setCouponConfig, couponConfig } = props;
  const deviceIdClient = getDeviceIdClient();
  const {} = useCartUIConfigLoader();
  const { setCountry: setSelectedCountry, country: selectedCountry } =
    useLocalizationStore();

  const route = useRouter();

  const deviceIdValue = deviceIdClient || deviceId;

  const paymentMethodId = useCheckoutStore().paymentMethodId;
  const { shipment, saveForFuture } = useCheckoutStore();

  const addressFormRef = useRef<AddressFormHandle>(null);
  const stripeRef = useRef<StripeCardDetailsRef>(null);
  const [selectCountryError, setSelectCountryError] = useState("");

  const {
    data: taxAndExtraCharges,
    isLoading,
    isError,
  } = useGetTaxAndCharges();

  const { data: cartData, myDiscounts, emptyCart } = useCartStore();
  const extraCharges: ExtraChargesModel[] =
    taxAndExtraCharges?.map((item) => ({
      label: item.key,
      amount: item.value,
      isPercentage: item.valueType === "percentage",
    })) ?? [];

  useEffect(() => {
    if (Object.keys(myDiscounts?.discountMap || {})) {
      setCouponConfig(myDiscounts);
    }
  }, [myDiscounts, setCouponConfig]);

  extraCharges.push({
    label: totalDepositKey,
    amount: RentUtils.getTotalDeposit(cartData),
    isPercentage: false,
  });

  const shipmentCharges = useCheckoutStore().shipment?.cost;
  const { currency, currencyRate } = useLocalizationStore();

  const cartTotal = CartUtils.getCharges(
    cartData,
    extraCharges,
    myDiscounts,
    shipmentCharges || 0,
  );

  const {
    paymentDestructure,
    total,
    extraChargeAmount,
    paymentDestructureWithOutSubTotal,
  } = cartTotal;

  const { mutateAsync: checkoutMutation, isPending: loadingCheckout } =
    useMutation({
      mutationFn: (checkoutRequest: CheckoutType) =>
        checkout(checkoutRequest, token),
      onSuccess: (data) => {
        emptyCart();
        route.replace(data?.data?.url);
      },
      onError: (error) => {
        console.error("Error in mutation:", error.message);
        toast.error(`Could not create order. Error: ${error.message}`);
      },
    });

  const handleClearForm = () => {
    if (addressFormRef.current) {
      addressFormRef.current.clearForm();
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e);
    handleClearForm();
  };

  const {
    mutateAsync: checkoutWithCardMutation,
    isPending: loadingCheckoutWithCard,
  } = useMutation({
    mutationFn: (checkoutWithCardRequest: CheckoutTypeCard) =>
      checkoutWithCard(checkoutWithCardRequest, token),
    onSuccess: (data) => {
      emptyCart();
      route.replace(ROUTES.ORDER_SUCCESSFUL + `?orderId=${data?.order?._id}`);
    },
    onError: (error) => {
      console.error("Error in mutation:", error.message);
      toast.error(`Could not create order. Error: ${error.message}`);
    },
  });

  const handleProceedToPay = async (passedCheckout?: PaymentOptionType) => {
    try {
      if (!selectedCountry.value || selectedCountry.value === "") {
        setSelectCountryError("Please select country");
        if (window !== undefined) {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
        }
        return;
      }
      if (isLoading) {
        toast.error(
          "Payment details are still loading. Please try again in a moment.",
        );
        console.error("Missing tax and extra charges during checkout");
        return;
      }
      if (isError) {
        toast.error(
          "Failed to load payment details. Please try again in a moment.",
        );
        console.error("Error in tax and extra charges during checkout");
        return;
      }

      // Set payment method ID from passed express checkout if available
      let currentPaymentMethodId = paymentMethodId;
      if (passedCheckout?.key) {
        currentPaymentMethodId = passedCheckout.key;
      }

      // Address form validation - skip if using express checkout
      let addressForm;
      if (!passedCheckout?.key) {
        if (!addressFormRef.current) {
          toast.error("Address form is missing");
          return;
        }

        addressForm = await addressFormRef.current.submitForm();
        if (!addressForm) {
          toast.error("Please complete your address details");
          return;
        }
      }
      console.log(addressForm, "addressForm");

      // Validate payment method selection
      if (!currentPaymentMethodId) {
        toast.error("Please select a payment method");
        return;
      }

      let stripePaymentId = "";
      let finalPaymentMethodId = currentPaymentMethodId;
      const isCardPayment = currentPaymentMethodId === creditCardKey;

      // Handle credit card payments through Stripe
      if (isCardPayment) {
        if (!stripeRef.current) {
          toast.error("Payment processor is not available");
          return;
        }

        if (stripeRef.current.isEmpty?.()) {
          toast.error("Please enter your card details");
          return;
        }

        const result = await stripeRef.current.submit();
        if (!result.success) {
          toast.error(result.error || "Payment processing failed");
          return;
        }

        stripePaymentId = result.paymentMethodId || "";
        finalPaymentMethodId = "";
      }

      // Common checkout fields for both payment types
      const commonCheckoutFields: BaseCheckout = {
        userDeviceId: deviceIdValue,
        totalPayment: cartTotal.subTotal,
        totalDiscount: paymentDestructure?.["Discount"],
        totalCharges: extraChargeAmount,
        finalPayment: cartTotal.total,
        couponConfig: JSON.stringify(couponConfig),
        paymentConfig: JSON.stringify(paymentDestructureWithOutSubTotal),
        shipmentId: shipment?._id || "",
        currencyCountry: currency,
        currencyRate: currencyRate,
        totalDeposit: RentUtils.getTotalDeposit(cartData),
      };

      if (isCardPayment) {
        // Card payment specific request with shipping and billing address
        const addressStringified = addressForm
          ? JSON.stringify({
              ...addressForm,
              country: selectedCountry?.value,
            })
          : "";
        const cardCheckoutRequest: CheckoutTypeCard = {
          ...commonCheckoutFields,
          shippingAddress: addressStringified,
          billingAddress: addressStringified,
          stripePaymentId: stripePaymentId,
          saveForFuture,
        };

        // Call the card-specific mutation
        await checkoutWithCardMutation(cardCheckoutRequest);
        // console.log(cardCheckoutRequest, "cardCheckoutRequest");
      } else {
        // Standard checkout request for non-card payments
        const standardCheckoutRequest: CheckoutType = {
          paymentMethodId: finalPaymentMethodId,
          ...commonCheckoutFields,
        };

        // Call the standard checkout mutation

        await checkoutMutation(standardCheckoutRequest);
        // console.log(standardCheckoutRequest, "standardCheckoutRequest");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div className="pt-8">
      <PageHeader className="font-medium">Checkout</PageHeader>
      <OrderSummaryMobile
        token={token as string}
        deviceId={deviceId as string}
        setCouponConfig={setCouponConfig}
      />
      <div>
        <div className="mb-4 px-4">
          <CountryDropdown
            selectedOption={selectedCountry}
            onChange={handleCountryChange}
          />
          {selectCountryError && selectedCountry.value === "" && (
            <ErrorText className="mt-1"> {selectCountryError} </ErrorText>
          )}
        </div>
        {selectedCountry.value === "GB" && (
          <>
            <ExpressCheckout
              onClick={handleProceedToPay}
              loading={cartData?.length < 1}
            />
            <OrDivider text="OR PAY LATER WITH" />
            <PayLaterOptions onClick={handleProceedToPay} />
            <OrDivider />
          </>
        )}
        <div className="px-4">
          <DeliveryOptions token={token} countryIso={selectedCountry?.value} />
          <CheckoutAddress formRef={addressFormRef} token={token || ""} />
          <h5 className="mt-8 font-medium">Payment</h5>
          <PaymentOptions stripeRef={stripeRef} />
        </div>
      </div>
      <div className="mt-8 px-4">
        {cartData &&
          cartData?.length > 0 &&
          cartData?.some((e) =>
            (e?.details as ProductCart)?.skuId?.includes("PO"),
          ) && (
            <div className="fall mb-4 rounded-lg bg-blue-light p-2">
              <h6 className="text-center font-medium capitalize">
                {PRE_ORDER_TIME_TEXT}
              </h6>
            </div>
          )}
        <Button
          fullWidth
          onClick={handleProceedToPay}
          isLoading={loadingCheckout || loadingCheckoutWithCard}
          disabled={cartData?.length < 1}
        >
          <div className="flex w-full items-center">
            <div className="flex flex-col items-start">
              <span className="opacity-80">Total</span>
              {loadingCheckout ||
              loadingCheckoutWithCard ||
              cartData?.length < 1 ? (
                <div className="shimmer-loading h-6 w-16 rounded" />
              ) : (
                <CurrencyDisplay amount={total} className="text-base" />
              )}
            </div>
            <h5 className="ml-auto font-semibold">Proceed to pay</h5>
            <Icon
              name="chevron"
              iconType="stroke"
              className="-rotate-90"
              size={20}
            />
          </div>
        </Button>
      </div>
      {loadingCheckout && (
        <div className="fall fixed top-0 left-0 z-50 h-dvh w-dvw overflow-hidden bg-gray-100/95">
          <Spinner className="z-[100]" color="black" size={30} />
        </div>
      )}
    </div>
  );
};

export default CheckoutDetails;
