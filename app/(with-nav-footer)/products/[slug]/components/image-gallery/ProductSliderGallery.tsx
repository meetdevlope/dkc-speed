"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import Slider from "components/slider/Slider";
import React, { useState } from "react";

type ProductSliderGalleryProps = {
  images: string[];
};

const ProductSliderGallery: React.FC<ProductSliderGalleryProps> = (props) => {
  const { images } = props;

  const [loaded, setLoaded] = useState(false);

  // Create image slide elements
  const imageSlides = images.map((item, index) => (
    <div key={index} className="relative aspect-3/4 w-full">
      <ImageComponent
        src={item}
        fill
        alt={"product-image" + index}
        objectFit="cover"
        priority={index === 0}
        onLoad={() => {
          if (index === 0) setLoaded(true);
        }}
      />
    </div>
  ));

  return (
    <div className="h-full">
      <div
        className={`shimmer-loading relative aspect-3/4 w-full bg-gray-100 transition-opacity ${
          loaded ? "hidden" : ""
        }`}
      />

      <div
        className={`element-slide-enter ${loaded ? "block" : "!hidden"} shimmer-wrapper`}
      >
        <Slider
          slides={imageSlides}
          showDots={true}
          showArrows={false}
          customOptions={customOptions}
          draggable={true}
          loop={true}
          perPage={1}
          slidesSpacing={0}
        />
      </div>
    </div>
  );
};

const customOptions = {
  autoplay: true,
  interval: 2000,
  pauseOnHover: true,
  pauseOnFocus: true,
};

export default ProductSliderGallery;
