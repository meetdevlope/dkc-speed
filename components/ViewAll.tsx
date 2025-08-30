import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

type ViewAllProps = {
  href: string;
};

const ViewAll: React.FC<ViewAllProps> = (props) => {
  const { href = "#" } = props;

  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-xs uppercase text-blue-500"
    >
      View All
      <span className="size-5">
        <Icons.chevron />
      </span>
    </Link>
  );
};

export default ViewAll;
