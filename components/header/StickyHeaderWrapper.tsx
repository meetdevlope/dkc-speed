"use client";

import { useScrollPosition } from "hooks/useScrollPosition";
import React, { ReactNode, useMemo, useRef } from "react";

type StickyHeaderWrapperProps = {
  children: ReactNode;
};

const StickyHeaderWrapper: React.FC<StickyHeaderWrapperProps> = (props) => {
  const { children } = props;

  const {
    scrollPosition: { y: scrollY },
    scrollDirection,
  } = useScrollPosition();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const showHeader = useMemo(
    () => (scrollY > 176 && scrollDirection === "up") || scrollY < 30,
    [scrollDirection, scrollY],
  );

  const shadow = useMemo(
    () => scrollY > 400 && scrollDirection === "up",
    [scrollDirection, scrollY],
  );

  return (
    <div
      ref={wrapperRef}
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${shadow ? "shadow-md" : ""}`}
    >
      {children}
    </div>
  );
};

export default StickyHeaderWrapper;
