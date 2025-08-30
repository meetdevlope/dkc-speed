"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import React, { useState } from "react";

type ProductDeskGalleryProps = {
  images: string[];
};

const ProductDeskGallery: React.FC<ProductDeskGalleryProps> = (props) => {
  const { images } = props;
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="relative flex w-full gap-4" style={{ aspectRatio: "1/1" }}>
      {/* Thumbnails column with fixed height and vertical scroll */}
      <div className="flex h-full w-1/4 flex-col gap-4 overflow-y-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full shrink-0 cursor-pointer bg-gray-100"
            style={{ aspectRatio: "3/4" }}
            onClick={() => setSelectedImage(index)}
          >
            <ImageComponent
              src={image}
              alt={`thumbnail-${index}`}
              className="rounded-none"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        ))}
      </div>

      {/* Main image - takes up the rest of the space */}
      <div className="h-full w-3/4 bg-gray-100">
        <div className="relative h-full w-full">
          <ImageComponent
            src={images[selectedImage]}
            alt={`product-image-${selectedImage}`}
            className="rounded-none"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDeskGallery;
