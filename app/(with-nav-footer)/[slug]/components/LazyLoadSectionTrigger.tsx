"use client";

import { useInView } from "hooks/useInView";
import { useState, ReactNode } from "react";

interface LazyLoadSectionTriggerProps {
  children: ReactNode;
  index: number;
  offset?: number;
}

export default function LazyLoadSectionTrigger({
  children,
}: LazyLoadSectionTriggerProps) {
  const [isVisible, setIsVisible] = useState(false);

  const [setTriggerRef, isInView] = useInView({
    rootMargin: "400px",
    threshold: 0,
    once: true,
  });

  if (isInView && !isVisible) {
    setIsVisible(true);
  }

  return (
    <div ref={setTriggerRef}>
      {isVisible ? children : <div className="h-20" />}
    </div>
  );
}
