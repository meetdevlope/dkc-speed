import Link from "next/link";
import React, { ReactNode } from "react";

type LinkOrTextProps = {
  children: ReactNode;
  link?: string;
  isLink: boolean;
  className?: string;
};

const LinkOrText: React.FC<LinkOrTextProps> = (props) => {
  const { children, isLink, link, className } = props;

  if (isLink) {
    return (
      <Link href={link || ""} className={className}>
        {children}
      </Link>
    );
  }
  return children;
};

export default LinkOrText;
