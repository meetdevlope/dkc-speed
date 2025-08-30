"use client";

import { useToggle } from "hooks/useToggle";
import React, { useEffect, useRef, useState } from "react";

interface CollectionDescriptionProps {
  description: string;
}

const CollectionDescription: React.FC<CollectionDescriptionProps> = (props) => {
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
    <div className="flex max-w-2xl flex-col justify-center gap-y-2">
      <div
        ref={descriptionRef}
        className={`[&>*]:text-center [&>*]:font-secondary [&>*]:text-sm [&>*]:leading-6 [&>*]:text-neutral-400 ${isOpen ? "" : "three-lines-ellipsis"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {isLongDescription && (
        <span
          className="cursor-pointer text-center text-xs font-medium hover:underline"
          onClick={toggle}
        >
          {isOpen ? "Read less" : "Read more"}
        </span>
      )}
    </div>
  );
};

export default CollectionDescription;
