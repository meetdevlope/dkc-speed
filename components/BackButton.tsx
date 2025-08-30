"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { cn } from "utils/helpers";
import Icon from "./icon/Icon";

type BackButtonProps = {
  noBorder?: boolean;
  className?: string;
  textOnly?: boolean;
};

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { noBorder = false, className, textOnly = false } = props;

  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  if (textOnly) {
    return (
      <button className={cn("cursor-pointer", className)} onClick={handleBack}>
        Back
      </button>
    );
  }

  return (
    <button
      className={cn(
        `${
          !noBorder && "border border-neutral-200 hover:bg-neutral-50/50"
        } fall size-10 cursor-pointer rounded-md bg-none outline-none`,
        className,
      )}
      onClick={handleBack}
    >
      <Icon
        name="chevron"
        iconType="stroke"
        className="rotate-90"
        color="var(--neutral-400)"
        size={24}
      />
    </button>
  );
};

export default BackButton;
