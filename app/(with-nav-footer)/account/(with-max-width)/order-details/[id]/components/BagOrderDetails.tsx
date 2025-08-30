import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import ReturnBagButton from "./ReturnBagButton";

type BagOrderDetailsProps = {
  skuIds: string[];
  price: string | number;
  enableReturn: boolean;
};

const BagOrderDetails: React.FC<BagOrderDetailsProps> = (props) => {
  const { skuIds, price, enableReturn = false } = props;

  return (
    <>
      {skuIds.map((item, index) => (
        <div
          className="flex flex-col items-start justify-between gap-4 rounded border p-3"
          key={index}
        >
          <div className="inline-flex w-full gap-4" key={index}>
            <div className="relative aspect-3/4 min-w-20 overflow-hidden rounded-sm">
              <ImageComponent
                fill
                src={
                  "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                objectFit="cover"
                objectPosition="center"
                alt="dkc-bag-image"
              />
            </div>
            <div className="my-auto flex flex-col gap-1">
              <h5 className="text-sm font-semibold">DKC Bag</h5>
              <h6> SKU: {item} </h6>
              <h6>
                Price: <strong> ${price} </strong>
              </h6>
            </div>
          </div>
          {enableReturn && <ReturnBagButton sku={item} />}
        </div>
      ))}
    </>
  );
};

export default BagOrderDetails;
