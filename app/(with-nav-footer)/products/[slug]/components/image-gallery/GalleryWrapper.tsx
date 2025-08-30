import React from "react";
import ProductSliderGallery from "./ProductSliderGallery";
import ProductDeskGallery from "./ProductDeskGallery";

type GalleryWrapperProps = {
  images: string[];
};

const GalleryWrapper: React.FC<GalleryWrapperProps> = (props) => {
  const { images } = props;

  return (
    <div>
      <div className="block lg:hidden">
        <ProductSliderGallery images={images} />
      </div>
      <div className="hidden lg:block">
        <ProductDeskGallery images={images} />
      </div>
    </div>
  );
};

export default GalleryWrapper;
