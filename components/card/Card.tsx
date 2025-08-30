import React, { ReactNode } from "react";
import { cn } from "utils/helpers";

type CardProps = {
  title: ReactNode;
  subTitle?: string;
  children: ReactNode;
  className?: string;
  right?: ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  const { children, subTitle, title, className, right } = props;

  return (
    <div
      className={cn(
        `bg-beige rounded-md border border-neutral-100 px-3 py-4 md:px-6 md:py-5`,
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-base md:text-lg"> {title}</h4>
        {right && right}
      </div>
      {subTitle && (
        <h6 className="text-description mb-8 text-xs md:text-sm">
          {subTitle}{" "}
        </h6>
      )}
      <div className={` ${title ? "mt-6" : ""}`}>{children}</div>
    </div>
  );
};

export default Card;
