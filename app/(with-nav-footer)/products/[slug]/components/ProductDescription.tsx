"use client";

import { useToggle } from "hooks/useToggle";
import React, { useEffect, useRef, useState } from "react";

type ProductDescriptionProps = {
  description: string;
};

const ProductDescription: React.FC<ProductDescriptionProps> = (props) => {
  const { description } = props;

  const { isOpen, toggle } = useToggle();

  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [isLongDescription, setIsLongDescription] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const isExceeding =
        descriptionRef.current.scrollHeight >
        descriptionRef.current.clientHeight;
      setIsLongDescription(isExceeding);
    }
  }, [description]);

  return (
    <div className="my-4 flex flex-col justify-end">
      <p className="my-2 text-xs font-medium text-neutral-500 md:text-sm">
        Description
      </p>
      <div
        ref={descriptionRef}
        className={`[&>*]:font-secondary [&>*]:text-sm [&>*]:leading-6 ${isOpen ? "" : "three-lines-ellipsis"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {isLongDescription && (
        <span
          className="ml-auto cursor-pointer text-xs font-medium hover:underline"
          onClick={toggle}
        >
          {isOpen ? "Read less" : "Read more"}
        </span>
      )}
    </div>
  );
};

export default ProductDescription;
