import Icon from "components/icon/Icon";
import Link from "next/link";
import React from "react";
import { cn } from "utils/helpers";

type ProductAuthenticatedProps = {
  url: string;
  className?: string;
};

const ProductAuthenticated: React.FC<ProductAuthenticatedProps> = (props) => {
  const { className, url } = props;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-4 w-0.5 bg-primary-500" />
      <p className="font-semibold text-primary-500">Authenticated</p>
      <Icon name="success" color="var(--primary-500)" size={20} />
      <Link
        href={url}
        target="_blank"
        className="text-xs text-neutral-400 hover:underline"
      >
        View Certificate
      </Link>
    </div>
  );
};

export default ProductAuthenticated;
