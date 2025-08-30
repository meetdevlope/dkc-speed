import React from "react";
import { ProductOptionValues } from "types/product.types";

type ColorSwatchesProps = {
  data: ProductOptionValues[];
};

const ColorSwatches: React.FC<ColorSwatchesProps> = (props) => {
  const { data } = props;

  return (
    <div className="flex items-center gap-2">
      {Array.isArray(data) &&
        data?.length > 0 &&
        data?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-x-1 rounded-md bg-blue-light px-2 py-1"
          >
            <h6> {item?.name} </h6>
            <div
              className="size-4 rounded-full"
              style={{
                backgroundColor: item?.value,
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default ColorSwatches;
