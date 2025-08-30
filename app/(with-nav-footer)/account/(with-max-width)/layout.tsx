import MaxWidthWrapper from "components/MaxWidthWrapper";
import { ReactNode } from "react";

export default function MaxWidthWrapperLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
