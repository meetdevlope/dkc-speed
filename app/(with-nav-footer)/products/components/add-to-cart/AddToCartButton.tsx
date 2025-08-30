"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, ButtonProps } from "components/Button";
import Icon from "components/icon/Icon";
import Spinner from "components/spinner/Spinner";
import Tooltip from "components/tooltip/Tooltip";
import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import { DiscountTypeEnum } from "enums/discountType.enum";
import { useGetBagConfig } from "hooks/queries/useGetBagConfig";
import { useCart } from "hooks/useCart";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "store/cart";
import { useCartCount } from "store/cartCount";
import { AddToCartRequest, ProductCart } from "types/cart.types";
import { Product } from "types/product.types";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { cn, getSizeFromOptions, jsonParser } from "utils/helpers";
import { BagConfigJSON } from "../../order-dkc-bag/action";
import { ProductToast } from "../ProductToast";

type AddToCartButtonProps = {
  token: string;
  deviceId: string;
  name?: string;
  image?: string;
  disabled?: boolean;
  disableMessage?: string;
  cartType: CartTypeEnum;
  skuId?: string;
  className?: string;
  rentStartDate?: Date | null;
  rentEndDate?: Date | null;
  price?: number;
  originalPrice?: number;
  discount?: number;
  discountType?: DiscountTypeEnum;
  rentDays?: number;
  moveToCart?: boolean;
  moveToCartText?: string;
  buttonText?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  onAddToCartSuccess?: () => void;
  brandId?: string;
  bagType?: BagCartEnum;
  options?: Product["options"];
} & (
  | {
      cartType: CartTypeEnum.bag;
      bagType: BagCartEnum;
    }
  | {
      cartType: Exclude<CartTypeEnum, CartTypeEnum.bag>;
      bagType?: never;
    }
);

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
  const {
    token,
    disabled,
    cartType,
    skuId = "",
    className,
    rentEndDate,
    rentStartDate,
    originalPrice,
    disableMessage,
    price = 0,
    rentDays = 0,
    moveToCart = false,
    variant = "primary",
    deviceId,
    onAddToCartSuccess,
    discount = 0,
    discountType = DiscountTypeEnum.fixed,
    bagType,
    brandId,
    moveToCartText,
    buttonText = "",
    size = "lg",
    image,
    name,
    options,
  } = props;

  const [itemAlreadyInCart, setItemAlreadyInCart] = useState<boolean>(false);

  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  const { data: bagConfigJSON } = useGetBagConfig();
  const bagConfig: BagConfigJSON = jsonParser(bagConfigJSON?.json || "");

  const req = useMemo<AddToCartRequest>(() => {
    if (cartType === CartTypeEnum.bag) {
      return {
        type: CartTypeEnum.bag,
        quantity: 1,
        userDeviceId: deviceIdValue,
        bagCart: {
          price: price || 0,
          type: bagType || BagCartEnum.normal,
          ...(bagType === BagCartEnum.brand && { brandId }),
          ...(bagType === BagCartEnum.dpp && { skuId }),
        },
      } as AddToCartRequest;
    } else if (cartType === CartTypeEnum.product_rent) {
      return {
        type: CartTypeEnum.product_rent,
        quantity: 1,
        userDeviceId: deviceIdValue,
        productCart: {
          skuId,
          rentStartDate: rentStartDate || "",
          rentEndDate: rentEndDate || "",
          forRent: true,
          price,
          originalPrice: originalPrice || 0,
          discountType,
          discount,
          rentDays,
        },
      };
    } else
      return {
        type: CartTypeEnum.product_purchase,
        quantity: 1,
        userDeviceId: deviceIdValue,
        productCart: {
          price,
          originalPrice: originalPrice || 0,
          skuId,
          rentStartDate: "",
          rentEndDate: "",
          forRent: false,
          discountType,
          discount,
        },
      };
  }, [
    cartType,
    deviceIdValue,
    price,
    originalPrice,
    skuId,
    discountType,
    discount,
    bagType,
    brandId,
    rentStartDate,
    rentEndDate,
    rentDays,
  ]);

  const queryClient = useQueryClient();
  const cartData = useCartStore((state) => state.data);
  const loadingCart = useCartStore((state) => state.loadingCart);

  const addToCartProductToast = useMemo(() => {
    if (cartType === CartTypeEnum.bag) {
      if (bagType === BagCartEnum.normal) {
        return {
          name: "DKC Bag",
          price: price || 0,
          image: bagConfig?.bagImage || "",
        };
      } else {
        return {
          name: name || "",
          price: price || 0,
          image: image || "",
        };
      }
    } else {
      return {
        name: name || "",
        price: price || 0,
        image: image || "",
        size: getSizeFromOptions(options) || "",
      };
    }
  }, [bagConfig?.bagImage, bagType, cartType, image, name, options, price]);

  const showToast = () => {
    toast.custom(
      (t) => <ProductToast t={t} product={addToCartProductToast} />,
      {
        duration: 3000,
      },
    );
  };

  useEffect(() => {
    if (cartType !== CartTypeEnum.bag) {
      const isExist = cartData?.some(
        (e) => (e?.details as ProductCart)?.skuId === skuId,
      );
      setItemAlreadyInCart(isExist || false);
    }
  }, [cartData, cartType, loadingCart, skuId]);

  const { addToCart } = useCart(token, deviceIdValue);

  const increment = useCartCount((state) => state.increment);

  const { mutateAsync: addToCartMutation, isPending: isAddingToCart } =
    useMutation({
      mutationFn: addToCart,
      onSuccess: () => {
        increment();
        if (onAddToCartSuccess) {
          onAddToCartSuccess();
        }

        if (
          addToCartProductToast.name &&
          addToCartProductToast.image &&
          addToCartProductToast.price
        ) {
          showToast();
        } else {
          toast.success("Added to cart");
        }
        queryClient.invalidateQueries({
          queryKey: ["get-cart"],
        });
      },
      onError: (error) => {
        console.error("Error in mutation:", error);
        toast.error(error.message || "Could not add item to cart. Try again!");
      },
    });

  const handleAddToCart = async () => {
    try {
      await addToCartMutation(req);
    } catch (error) {
      console.log(error);
    }
  };

  const getButtonText = () => {
    if (loadingCart) return "Loading";
    if (itemAlreadyInCart) return "Already in cart";
    if (isAddingToCart) return "Adding";
    if (disabled && disableMessage) return disableMessage;
    if (moveToCart) return moveToCartText || "Move to cart";
    return buttonText || "Add to cart";
  };

  const disableButton = useMemo(
    () => disabled || isAddingToCart || loadingCart || itemAlreadyInCart,

    [disabled, isAddingToCart, itemAlreadyInCart, loadingCart],
  );

  return (
    <>
      {moveToCart ? (
        <Tooltip
          // content={null}
          content={getButtonText()}
        >
          <button
            className={cn(
              `fall cursor-pointer gap-2 self-end rounded-full bg-neutral-50 p-1.5 text-sm text-nowrap hover:bg-neutral-100 disabled:cursor-not-allowed`,
              className,
            )}
            onClick={() => handleAddToCart()}
            disabled={disableButton}
          >
            {!disableButton && <Icon name="cart" iconType="stroke" size={20} />}
            {(itemAlreadyInCart || disabled) && (
              <Icon
                name="ban"
                iconType="stroke"
                size={18}
                className="stroke-[1.3px]"
              />
            )}
            {(isAddingToCart || loadingCart) && <Spinner />}
          </button>
        </Tooltip>
      ) : (
        <Button
          size={size}
          variant={variant}
          className={cn(`w-full`, className)}
          onClick={handleAddToCart}
          disabled={disableButton}
        >
          {getButtonText()}
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
