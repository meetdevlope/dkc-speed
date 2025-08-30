import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import React from "react";
import { Brand } from "types/brand.types";
import { cn } from "utils/helpers";
import { ROUTES } from "utils/routes";

type BrandsCardProps = {
  brand: Brand;
  className?: string;
};

const BrandsCard: React.FC<BrandsCardProps> = (props) => {
  const { brand, className } = props;

  return (
    <Link
      href={ROUTES.PRODUCTS.SLUG(`?brand=${brand?._id}`)}
      className={cn(className)}
    >
      <div className="relative aspect-square md:aspect-video">
        {brand?.coverImage ? (
          <ImageComponent
            alt={`${brand?.name}-alt`}
            src={brand?.coverImage}
            fill
            className="rounded-lg object-top"
          />
        ) : (
          <div className="fall h-full rounded-lg">
            <h6 className="truncate font-medium text-white">{brand?.name}</h6>
          </div>
        )}
        <div className="absolute right-0 bottom-1 left-0 mx-1 rounded-md border border-white bg-black/15 px-1 py-0.5 backdrop-blur-md backdrop-saturate-50">
          <h6 className="truncate text-center !font-primary text-sm text-white uppercase text-shadow-neutral-500/60 text-shadow-xs">
            {brand?.name}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default BrandsCard;
