import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";

export type ImageCardProps = {
  image: string;
  title: string;
  description?: string;
};

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { image, title, description } = props;

  return (
    <>
      <div className="hidden w-full flex-col gap-2 md:flex">
        <div className="shimmer-loading relative aspect-square w-full">
          <ImageComponent src={image} fill alt={`${title}-alt`} />
        </div>
        <h4 className="mt-4 font-primary uppercase"> {title} </h4>
        <h6 className="text-description"> {description} </h6>
      </div>
      <div className="flex gap-2 md:hidden">
        <div className="relative size-[130px] min-h-[130px] min-w-[130px] overflow-hidden rounded-sm md:size-[180px] md:min-h-[180px] md:min-w-[180px]">
          <ImageComponent src={image} fill alt={`${title}-alt`} />
        </div>
        <div className="mt-1">
          <h6 className="mb-1 font-primary font-semibold uppercase">{title}</h6>
          <p className="text-description"> {description} </p>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
