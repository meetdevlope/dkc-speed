import React from "react";
import { cn } from "utils/helpers";

type SectionTitleProps = {
  title: string;
  className?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { title = "Section Title", className } = props;

  return (
    <h5
      className={cn(
        "text-center font-primary font-bold text-neutral-500 uppercase md:text-lg lg:text-xl",
        className,
      )}
    >
      {title}
    </h5>
  );
};

export default SectionTitle;
