"use client";

import { useQuery } from "@tanstack/react-query";
import { useInView } from "hooks/useInView";
import React from "react";
import { getProductBadge } from "./action";

type ProductBadgeProps = {
  productId: string;
};

const ProductBadge: React.FC<ProductBadgeProps> = (props) => {
  const { productId } = props;

  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 1,
    once: true,
  });

  const { data, isError, isPending } = useQuery({
    queryFn: () => getProductBadge(productId),
    queryKey: [`product-badge-${productId}`],
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: isInView,
  });

  if (isError || (data && data?.length < 1)) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="absolute top-1.5 left-1.5 truncate rounded-md px-1.5 py-0.5 text-[11px] md:top-2 md:left-2 lg:top-3 lg:left-3"
      style={{
        backgroundColor: data?.[0]?.backgroundColor,
        color: data?.[0]?.textColor,
      }}
    >
      {isInView && isPending ? (
        <div className="shimmer-loading h-5 w-28 rounded" />
      ) : (
        data?.[0]?.name
      )}
    </div>
  );
};

export default ProductBadge;
