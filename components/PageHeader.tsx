import React, { ReactNode } from "react";
import BackButton from "./BackButton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "utils/helpers";

type PageHeaderProps = {
  children: ReactNode;
  className?: string;
  endElement?: ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { children, className, endElement } = props;

  return (
    <div className={cn(`bg-white shadow-sm lg:shadow-none`, className)}>
      <MaxWidthWrapper>
        <div className="flex items-center p-2">
          <BackButton noBorder />
          <h5 className="mr-auto font-medium">{children}</h5>
          {endElement && endElement}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PageHeader;
