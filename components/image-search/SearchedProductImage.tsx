"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import ImageUpload from "./ImageUpload";

type SearchedProductImageProps = {
  imageUrl: string;
};

const SearchedProductImage: React.FC<SearchedProductImageProps> = (props) => {
  const { imageUrl } = props;

  return (
    <div className="group relative size-9 overflow-hidden rounded">
      <ImageComponent src={imageUrl} alt="search-img" fill />
      <div className="absolute top-0 left-0 hidden h-full w-full bg-black/60 group-hover:block">
        <ImageUpload iconColor="white" />
      </div>
    </div>
  );
};

export default SearchedProductImage;
