import ProductCard from "components/product-card/ProductCard";
import React from "react";
import { getAppCardItems } from "types/cms/card/action";
import { CustomAppCardModel, GroupViewConfig } from "types/cms/component.types";
import { Product } from "types/product.types";
import { cn, getSizeFromOptions } from "utils/helpers";
import CardRenderer from "./CardRenderer";

type CardWrapperProps = {
  config: GroupViewConfig;
};

const CardWrapper: React.FC<CardWrapperProps> = async (props) => {
  const { config } = props;
  const {
    appCardVersion,
    cardViewType,
    horizontalGap,
    startPadding,
    verticalGap,
    gap,
    crossItemCount,
    cardType,
  } = config;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${crossItemCount}, minmax(0, 1fr))`,
    rowGap: horizontalGap ? `${horizontalGap}px` : 0,
    columnGap: verticalGap ? `${verticalGap}px` : 0,
  };

  const listStyle: React.CSSProperties = {
    // <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
    marginInline: startPadding ? `${startPadding}px` : 0,
    display: "flex",
    alignItems: "stretch",
    gap: gap ? `${gap}px` : 0,
    overflowX: "auto",
  };
  const style = cardViewType === "grid" ? gridStyle : listStyle;
  const className = cn(cardViewType === "grid" ? "" : "no-scrollbar");
  const cardList = await getAppCardItems(config);

  return (
    <div className={className} style={style} aria-label={cardViewType}>
      {cardType === "product" && (
        <>
          {Array.isArray(cardList) &&
            cardList?.length > 0 &&
            (cardList as Product[])?.map((product, i) => (
              <ProductCard
                key={i}
                image={product.photos?.[0]}
                name={product.name}
                price={product.sellingPrice}
                size={getSizeFromOptions(product.options)}
                skuId={product.skuId}
                slug={product.slug}
                productId={product._id}
                eligibleForRent={product.eligibleForRent}
                maxWidth={cardViewType !== "grid" ? 200 : undefined}
                originalPrice={product?.totalPrice}
                rentPrice={product?.rentPrice}
              />
            ))}
        </>
      )}

      {cardType !== "product" && (
        <>
          {Array.isArray(cardList) &&
            cardList?.length > 0 &&
            (cardList as CustomAppCardModel[])?.map((e, i) => {
              return (
                <CardRenderer
                  config={e}
                  key={i}
                  version={appCardVersion}
                  isWidthCard={cardViewType === "list"}
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default CardWrapper;
