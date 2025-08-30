"use client";

import { useSearchParams } from "next/navigation";
import ImageUpload from "./ImageUpload";
import SearchedProductImage from "./SearchedProductImage";

const ImageSearch = () => {
  const searchParams = useSearchParams();

  const imageUrl = searchParams.get("imageUrl");

  return (
    <div className="fall min-w-9 cursor-pointer">
      {imageUrl ? (
        <SearchedProductImage imageUrl={imageUrl} />
      ) : (
        <ImageUpload iconColor="black" />
      )}
    </div>
  );
};

export default ImageSearch;
