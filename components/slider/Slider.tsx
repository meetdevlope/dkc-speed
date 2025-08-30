"use client";
import React, { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

// Define type for the props
const Slider: React.FC<SplideSliderProps> = ({
  slides,
  showDots = true,
  autoScroll = false,
  slidesSpacing = 4,
  animationDelay = 5000,
  animationSpeed = 400,
  perPage = 1,
  perMove = 1,
  loop = true, // Default is true - we'll always enable looping
  showArrows = false,
  draggable = true,
  direction = "ltr",
  height,
  className = "",
  breakpoints,
  customOptions = {},
}) => {
  const splideRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Splide | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [actualPerPage, setActualPerPage] = useState(perPage);

  useEffect(() => {
    if (splideRef.current && slides.length > 0) {
      // Destroy previous instance if it exists
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }

      // Configure Splide options
      const options = {
        type: "slide",
        perPage,
        perMove,
        gap: slidesSpacing,
        pagination: false, // Disable default pagination to use custom dots
        arrows: showArrows,
        autoplay: autoScroll,
        interval: animationDelay,
        speed: animationSpeed,
        loop: true, // Force looping
        rewind: true, // Enable rewinding for smooth navigation
        rewindByDrag: true, // Allow rewinding by drag
        isNavigation: false, // Ensure navigation is not limited
        drag: draggable,
        direction,
        height,
        breakpoints,
        ...customOptions,
      };

      // Initialize Splide
      instanceRef.current = new Splide(splideRef.current, options);

      // Track current slide
      instanceRef.current.on("moved", () => {
        if (instanceRef.current) {
          setCurrentSlide(instanceRef.current.index);
        }
      });

      // Track total slides and current perPage setting
      instanceRef.current.on("mounted updated", () => {
        if (instanceRef.current) {
          setTotalSlides(instanceRef.current.length);
          // Get the current perPage value which may be affected by breakpoints
          setActualPerPage(instanceRef.current.options.perPage as number);
        }
      });

      instanceRef.current.mount();
    }

    // Cleanup function
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [
    slides,
    showDots,
    autoScroll,
    slidesSpacing,
    animationDelay,
    animationSpeed,
    perPage,
    perMove,
    loop,
    showArrows,
    draggable,
    direction,
    height,
    customOptions,
    breakpoints,
  ]);

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    if (instanceRef.current) {
      instanceRef.current.go(index);
    }
  };

  const calculateDots = () => {
    if (totalSlides <= actualPerPage) return 1;

    return Math.ceil((totalSlides - actualPerPage) / perMove) + 1;
  };

  // Generate the dot elements
  const renderDots = (): React.ReactNode[] => {
    const dotsCount = calculateDots();
    const dots: React.ReactNode[] = [];

    for (let i = 0; i < dotsCount; i++) {
      // Determine if this dot is active
      // This needs to handle the case where currentSlide might be beyond the last dot's position
      const isActive =
        currentSlide >= i * perMove &&
        (i === dotsCount - 1 || currentSlide < (i + 1) * perMove);

      dots.push(
        <button
          key={i}
          onClick={() => goToSlide(i * perMove)}
          className={`h-[1px] ${
            isActive ? "w-8 bg-black" : "w-8 bg-gray-200"
          } transition-all duration-300`}
          aria-label={`Go to slide ${i + 1}`}
        />,
      );
    }

    return dots;
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className={`splide-container ${className}`}>
      <div ref={splideRef} className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {slides.map((slide, index) => (
              <li key={index} className="splide__slide">
                {slide}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showDots && slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">{renderDots()}</div>
      )}
    </div>
  );
};

export default Slider;

export interface SplideSliderProps {
  /**
   * Array of slide content (can be JSX elements or strings)
   */
  slides: React.ReactNode[];
  /**
   * Show navigation dots
   * @default true
   */
  showDots?: boolean;
  /**
   * Enable auto scroll
   * @default false
   */
  autoScroll?: boolean;
  /**
   * Spacing between slides in px
   * @default 16
   */
  slidesSpacing?: number;
  /**
   * Animation delay in milliseconds
   * @default 5000
   */
  animationDelay?: number;
  /**
   * Animation speed in milliseconds
   * @default 400
   */
  animationSpeed?: number;
  /**
   * Number of slides to show at once
   * @default 1
   */
  perPage?: number;
  /**
   * Number of slides to move when navigating
   * @default 1
   */
  perMove?: number;
  /**
   * Enable infinite looping
   * @default true
   */
  loop?: boolean;
  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  /**
   * Allow drag to navigate
   * @default true
   */
  draggable?: boolean;
  /**
   * Direction of slider movement
   * @default 'ltr'
   */
  direction?: "ltr" | "rtl" | "ttb";
  /**
   * Height of the slider (for vertical sliders)
   */
  height?: string;
  /**
   * Custom class name for the slider container
   */
  className?: string;
  /**
   * Responsive breakpoints configuration
   */
  breakpoints?: {
    [key: number]: {
      perPage?: number;
      perMove?: number;
      padding?: {
        left?: number;
        right?: number;
      };
    };
  };
  /**
   * Custom Splide options to override defaults
   */
  customOptions?: Record<string, any>;
}
