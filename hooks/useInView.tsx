import { useCallback, useRef, useState } from "react";

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView<T extends HTMLElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  once = false,
}: UseInViewOptions = {}): [(el: T | null) => void, boolean] {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      if (!node) return; // If no element, do nothing

      if (observerRef.current) {
        observerRef.current.disconnect(); // Clean previous observer
      }

      observerRef.current = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) observer.disconnect(); // Stop observing after first entry
          } else if (!once) {
            setIsInView(false);
          }
        },
        { root, rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [root, rootMargin, threshold, once],
  );

  return [setRef, isInView];
}
