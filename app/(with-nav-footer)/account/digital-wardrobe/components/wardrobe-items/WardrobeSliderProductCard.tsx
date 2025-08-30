import { CurrencyDisplay } from "components/CurrencyDisplay";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { WardrobeItem } from "../../action";

const WardrobeSliderProductCard: React.FC<WardrobeItem> = (props) => {
  const { photos, name, purchasePrice, size } = props || {};

  return (
    <div className="flex gap-x-2.5 rounded-md bg-white p-2.5">
      <ImageComponent
        src={photos?.[0]}
        alt={name + "-alt"}
        className="aspect-3/4 rounded"
        width={80}
        height={120}
      />
      <div>
        <h6 className="two-lines-ellipsis truncate font-primary font-medium text-wrap">
          {name}
        </h6>
        <div className="my-1">
          {size && (
            <h6 className="text-neutral-400">
              Size <span className="uppercase"> {size} </span>
            </h6>
          )}
        </div>
        <CurrencyDisplay
          className="font-secondary text-base font-medium"
          amount={purchasePrice}
        />
      </div>
    </div>
  );
};

export default WardrobeSliderProductCard;
