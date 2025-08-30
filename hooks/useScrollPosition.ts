import { useState, useEffect } from "react";

type ScrollPosition = {
  x: number;
  y: number;
};

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null,
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame: number | null = null;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;

      setScrollPosition({ x: window.scrollX, y: currentScrollY });

      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return { scrollPosition, scrollDirection };
}
