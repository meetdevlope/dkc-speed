import React, { ReactNode, Suspense } from "react";
import ProductListSkeleton from "./ProductListSkeleton";

type ProductListSliderProps = {
  children: ReactNode;
};

const ProductListSlider: React.FC<ProductListSliderProps> = (props) => {
  const { children } = props;

  if (!children) {
    return (
      <div className="fall my-8 w-full">
        <h6>No products found :(</h6>
      </div>
    );
  }
  if (Array.isArray(children) && children.length < 1) {
    return (
      <div className="fall my-8 w-full">
        <h6>No products found :(</h6>
      </div>
    );
  }

  return (
    <Suspense fallback={<ProductListSkeleton number={6} />}>
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
        {children}
      </div>
    </Suspense>
  );
};

export default ProductListSlider;
