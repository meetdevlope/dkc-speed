/* eslint-disable @typescript-eslint/no-explicit-any */
export const alpha = (hex: string, alpha: number) => {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r},${g},${b},${alpha})`;
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "types/product.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNullish = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string") {
    if (value === "") {
      return true;
    } else return false;
  }
  if (typeof value === "boolean") {
    return false;
  }
  if (typeof value === "number") {
    return isNaN(value) || !isFinite(value);
  }
  if (typeof value === "object") {
    if (Object.keys(value)?.length < 1) {
      return true;
    }
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    }
  }
  return false;
};

export const jsonParser = (data: string | null | undefined, name?: string) => {
  try {
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.log(error, "Invalid json", name);
    return null;
  }
};

export const getSizeFromOptions = (options: Product["options"] | undefined) => {
  if (options) {
    const validSizeKeys = ["size", "age/size"];

    const size =
      options?.find((e) =>
        validSizeKeys?.some((key) => key === e?.key?.toLowerCase()),
      )?.value || "";

    if (size) {
      return size;
    }
    return null;
  }
  return "No size options found";
};

export const convertInchToCm = (
  value: any,
  selectedUnit: string,
  resUnit: string,
) => {
  if (!value) return value;

  if (selectedUnit?.toLowerCase() === resUnit?.toLowerCase()) return value;

  if (typeof value === "string" && value?.includes("-")) {
    return value
      .split("-")
      .map((num) =>
        isNaN(Number(num)) ? num : (Number(num) * 2.54).toFixed(1),
      )
      .join(" - ");
  }
  return isNaN(Number(value)) ? value : (Number(value) * 2.54).toFixed(1);
};

export const ageSizeId = "6772e455b6a059236670a512";
export const conditionId = "67a354b7276fc4bea3579ec2";

export const PRE_ORDER_TIME_TEXT = `This item may take 2-3 weeks to arrive`;
