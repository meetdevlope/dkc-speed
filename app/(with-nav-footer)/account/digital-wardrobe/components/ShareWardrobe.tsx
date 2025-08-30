"use client";

import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React, { ReactNode, useState } from "react";
import { generateShareWardrobe, WardrobeItem } from "../action";
import { ImageComponent } from "components/image-component/ImageComponent";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Checkbox from "components/Checkbox";
import { Button } from "components/Button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Icon from "components/icon/Icon";
import { ROUTES } from "utils/routes";
import Spinner from "components/spinner/Spinner";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "utils/copyToClipboard";

interface ShareWardrobeProps {
  token: string;
  trigger: ReactNode;
  dialogTitle?: string;
  products: WardrobeItem[];
}

const ShareWardrobe: React.FC<ShareWardrobeProps> = (props) => {
  const { trigger, token, dialogTitle, products } = props;
  const { close, isOpen, open } = useToggle();
  const [selected, setSelected] = useState<string[]>([]);
  const [shareId, setShareId] = useState("");
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const handleSelection = (id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id],
    );
  };

  const mutation = useMutation({
    mutationFn: () =>
      generateShareWardrobe(token, {
        productId: selected,
      }),
    onSuccess: (data) => {
      const sharedId = data?._id;
      if (sharedId) {
        setShareId(sharedId || "");
      } else {
        toast.error("No link generated");
      }
    },
    onError: (error) => {
      toast.error("Error while generating link");
      console.error("Failed to delete family member:", error);
    },
  });

  const handleGenerateClick = () => {
    if (selected.length > 0) {
      mutation.mutate();
    } else {
      toast.error("No products selected");
    }
  };

  const isAllSelected =
    products.length > 0 && selected.length === products.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(products.map((item) => item._id));
    }
  };

  const handleRedirection = () => {
    router.push(ROUTES.SHARE_WARDROBE(shareId));
  };

  const handleCopyLink = async () => {
    setIsCopied(false);
    await copyToClipboard(baseUrl(shareId));
    setIsCopied(true);
  };

  const handleClose = () => {
    close();
    setSelected([]);
    setIsCopied(false);
    setShareId("");
  };

  return (
    <div>
      <div onClick={open}>{trigger}</div>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title={dialogTitle || "Share Wardrobe"}
        size="lg"
        trailingHeaderComponent={
          !shareId ? (
            <Button size="sm" variant="outline" onClick={handleSelectAll}>
              Select All
            </Button>
          ) : null
        }
        actions={{
          primary: !shareId
            ? {
                label: "Generate link",
                onClick: handleGenerateClick,
                size: "md",
                disabled: selected.length < 1,
                loading: mutation.isPending,
              }
            : {
                label: "View Shared Wardrobe",
                onClick: handleRedirection,
                size: "md",
                disabled: selected.length < 1,
              },
        }}
      >
        {mutation.isPending ? (
          <div className="fall">
            <Spinner color="var(--primary-500)" size={40} />
          </div>
        ) : !shareId ? (
          <div className="flex flex-col divide-y divide-gray-100">
            {products?.map((product, index) => (
              <div
                key={index}
                onClick={() => handleSelection(product?._id)}
                className="flex cursor-pointer items-center gap-x-2 rounded-md p-1 py-2 transition-colors hover:bg-blue-light/70"
              >
                <Checkbox
                  // onChange={() => handleSelection(product?._id)}
                  checked={selected.includes(product?._id)}
                />
                <ImageComponent
                  src={product?.photos?.[0]}
                  alt={product?.name + "-alt-img"}
                  width={44}
                  height={50}
                  className="aspect-3/4 rounded"
                />
                <div className="flex w-full flex-col gap-y-1 md:flex-row md:justify-between">
                  <h5 className="font-medium"> {product?.name} </h5>
                  <CurrencyDisplay amount={product?.purchasePrice} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h4 className="mb-4 text-center font-medium text-primary-500">
              Link generate successfully!!
            </h4>
            <div className="flex items-stretch overflow-hidden rounded-md border border-gray-100">
              <div className="w-full px-3 py-2">
                {baseUrl(shareId) || "No shared id generated"}
              </div>
              <div className="fall bg-primary-500 px-2 hover:bg-primary-600">
                {isCopied ? (
                  <p className="text-sm font-medium text-white">Copied</p>
                ) : (
                  <div className="fall cursor-pointer gap-x-1">
                    <Icon
                      name="copy"
                      color="white"
                      iconType="stroke"
                      size={16}
                      className="stroke-[1.5px]"
                    />
                    <button
                      className="text-sm font-medium text-nowrap text-white"
                      onClick={handleCopyLink}
                    >
                      Copy{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ShareWardrobe;

const baseUrl = (shareId: string) => {
  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://demo.designerkidsclub.com";

  return url + ROUTES.SHARE_WARDROBE(shareId);
};
