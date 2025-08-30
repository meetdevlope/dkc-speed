"use client";

import React, { useEffect } from "react";
import { RVUtil } from "utils/recentlyViewed";

type SetRecentlyViewedProps = {
  productId: string;
};

const SetRecentlyViewed: React.FC<SetRecentlyViewedProps> = (props) => {
  const { productId } = props;

  useEffect(() => {
    if (productId) {
      RVUtil.storeRecentlyViewedItems(productId);
    }
  }, [productId]);

  return <></>;
};

export default SetRecentlyViewed;
