"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";
import defaultFallback from "../../public/fallback-img.jpg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { cn } from "utils/helpers";

type ImageComponentProps = Omit<ImageProps, "onError" | "onLoadingComplete"> & {
  fallbackSrc?: string | StaticImport;
};

export const ImageComponent = ({
  src,
  alt,
  className = "",
  ...props
}: ImageComponentProps) => {
  const [imgSrc, setImgSrc] = useState<typeof src>(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  return (
    <Image
      src={imgSrc || defaultFallback}
      // objectFit="cover"
      alt={alt || ""}
      className={cn(
        "object-cover transition-opacity duration-300",
        isLoading ? "shimmer-loading" : "",
        className,
      )}
      onError={() => {
        setImgSrc(defaultFallback);
      }}
      onLoad={() => {
        setIsLoading(false);
      }}
      {...props}
    />
  );
};
