import React, { ReactNode } from "react";
import BackButton from "./BackButton";

type PageTitleProps = {
  children: ReactNode;
};

const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { children } = props;

  return (
    <div className="border-b-secondary relative mt-1 flex min-h-14 items-center gap-4 border-b px-4 md:border-0">
      <BackButton noBorder className="absolute left-2 md:relative" />
      <h4 className="mx-auto text-center font-primary font-semibold uppercase md:mx-0 md:text-left">
        {children}
      </h4>
    </div>
  );
};

export default PageTitle;
