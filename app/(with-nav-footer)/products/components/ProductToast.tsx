"use client";

import { Button } from "components/Button";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Image from "next/image";
import Link from "next/link";
import type { Toast } from "react-hot-toast";
import toast from "react-hot-toast";
import { ROUTES } from "utils/routes";

interface Product {
  name: string;
  price: number;
  image: string;
  size?: string;
}

interface ProductToastProps {
  t: Toast;
  product: Product;
}

export function ProductToast({ t, product }: ProductToastProps) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } ring-opacity-5 pointer-events-auto flex w-full max-w-sm rounded-xl bg-white shadow-lg ring-1 ring-neutral-100 md:max-w-md`}
    >
      <div className="w-0 flex-1 p-3">
        <div className="flex">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-ful relative aspect-3/4 w-16 rounded md:w-[72px]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="rounded object-cover"
              />
              <button
                className="absolute -top-6 -left-6 z-10 cursor-pointer rounded-full border border-neutral-100 bg-white p-0.5"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="ml-3 flex flex-1 flex-col gap-y-1.5">
            <h6 className="one-lines-ellipsis font-medium text-neutral-500">
              {product.name}
            </h6>
            {product.size && (
              <p className="text-gray-500">Size: {product.size}</p>
            )}
            <CurrencyDisplay amount={product?.price} className="block" />
            <Link href={ROUTES.CART} className="mt-auto">
              <Button
                size="sm"
                fullWidth
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                View cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="size-[18px] text-neutral-300"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
