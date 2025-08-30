"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReturnBagButton from "app/(with-nav-footer)/account/(with-max-width)/order-details/[id]/components/ReturnBagButton";
import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";
import Badge from "components/Badge";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { ImageComponent } from "components/image-component/ImageComponent";
import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import { useCart } from "hooks/useCart";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DeleteCartItem from "../cart/DeleteCartItem";
import { useCartUIConfigStore } from "store/cartUIConfigStore";

interface BagCartItemProps {
  id: string;
  price: number;
  token: string;
  image?: string;
  deviceId: string;
  viewOnly?: boolean;
  type: CartTypeEnum.bag;
  quantity: number;
  bagType: BagCartEnum;
  brandId?: string;
  skuId?: string;
  enableReturn?: boolean;
  bagPrice?: number;
  bagQuantity?: number;
}

const BagCartItem: React.FC<BagCartItemProps> = (props) => {
  const {
    type,
    id,
    token,
    price,
    deviceId,
    viewOnly = false,
    enableReturn,
    skuId,
    bagQuantity = 0,
    image: passedBagImage = "",
  } = props;

  const queryClient = useQueryClient();
  const cartUIConfig = useCartUIConfigStore();
  const {
    defaultCartQuantity,
    maximumCartQuantity,
    minimumCartQuantity,
    bagImage,
    pricePerBag,
  } = cartUIConfig.bagConfig;

  useEffect(() => {
    if (type === "bag") {
      setQuantity(props.quantity);
    }
  }, [props, type]);

  const [quantity, setQuantity] = useState(defaultCartQuantity);

  const { updateQuantity } = useCart(token, deviceId);

  const { data: brandDetails } = useQuery({
    queryKey: [`brand-details-${props?.brandId || ""}`],
    queryFn: () => getBrandDetails(props?.brandId || ""),
    enabled: props?.bagType === BagCartEnum.brand || false,
  });

  const bagImageSrc = useMemo(() => {
    if (props.bagType === BagCartEnum.normal) {
      return bagImage || "";
    } else if (props.bagType === BagCartEnum.brand) {
      return brandDetails?.bagImage || "";
    } else return "";
  }, [bagImage, brandDetails?.bagImage, props.bagType]);

  const bagTitle = useMemo(() => {
    if (props.bagType === BagCartEnum.normal) {
      return "DKC Bag";
    } else if (props.bagType === BagCartEnum.brand) {
      return "DKC X " + brandDetails?.name;
    } else return "";
  }, [brandDetails?.name, props.bagType]);

  const { mutateAsync: updateQuantityMutation } = useMutation({
    mutationFn: updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: (error) => {
      console.error("Error while updating item quantity:", error.message);
      toast.error("Could not update item quantity");
    },
  });

  const handleUpdateQuantity = useCallback(
    async (quantity: number) => {
      try {
        await updateQuantityMutation({
          id,
          quantity,
        });
        setQuantity(quantity);
      } catch (error) {
        console.log(error);
      }
    },
    [id, updateQuantityMutation],
  );

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleUpdateQuantity(Number(e.target.value));
    },
    [handleUpdateQuantity],
  );

  const quantityOptions = Array.from(
    { length: maximumCartQuantity - minimumCartQuantity + 1 },
    (_, index) => minimumCartQuantity + index,
  );

  return (
    <div className="flex gap-4">
      <Badge content={bagQuantity || 0}>
        <div className="relative aspect-3/4 min-w-16 overflow-hidden rounded-sm md:min-w-18">
          <ImageComponent
            fill
            src={passedBagImage || bagImageSrc}
            objectFit="cover"
            objectPosition="center"
            alt={`${bagTitle}-alt-img`}
          />
        </div>
      </Badge>

      <div className="my-auto flex flex-col gap-1">
        <h6 className="font-medium"> {bagTitle} </h6>
        <CurrencyDisplay amount={price || pricePerBag} />
        {skuId && (
          <p>
            <span className="font-medium">{skuId}</span>
          </p>
        )}
        {enableReturn && <ReturnBagButton sku={skuId || ""} />}
      </div>
      {!viewOnly && (
        <div className="mr-2 ml-auto flex flex-col items-end gap-y-4">
          <DeleteCartItem token={token} deviceId={deviceId} deleteId={id} />
          <span>
            <span className="text-neutral-400">Quantity:&nbsp;</span>
            <select
              className="rounded-sm border p-0.5 px-1 text-xs"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {quantityOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </div>
      )}
    </div>
  );
};

export default BagCartItem;
