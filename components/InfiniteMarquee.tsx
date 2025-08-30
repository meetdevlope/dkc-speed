import React from "react";
// Note: In a real project, you would install and import react-fast-marquee:
// npm install react-fast-marquee
import Marquee from "react-fast-marquee";

// For this demo, I'll create a simplified version that mimics react-fast-marquee's API
// const Marquee = ({
//   children,
//   speed = 50,
//   direction = "left",
//   pauseOnHover = false,
//   gradient = false,
//   gradientColor = "white",
//   gradientWidth = 200,
//   ...props
// }) => {
//   const animationDuration = `${100 / speed}s`;

//   return (
//     <div className="relative w-full overflow-hidden" {...props}>
//       {gradient && (
//         <>
//           <div
//             className="pointer-events-none absolute top-0 left-0 z-10 h-full"
//             style={{
//               width: `${gradientWidth}px`,
//               background: `linear-gradient(to right, ${gradientColor}, transparent)`,
//             }}
//           />
//           <div
//             className="pointer-events-none absolute top-0 right-0 z-10 h-full"
//             style={{
//               width: `${gradientWidth}px`,
//               background: `linear-gradient(to left, ${gradientColor}, transparent)`,
//             }}
//           />
//         </>
//       )}
//       <div
//         className={`animate-marquee flex ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
//         style={{
//           animationDuration,
//           animationDirection: direction === "right" ? "reverse" : "normal",
//           animationTimingFunction: "linear",
//           animationIterationCount: "infinite",
//           transform: "translateX(0%)",
//         }}
//       >
//         <div className="flex shrink-0">{children}</div>
//         <div className="flex shrink-0" aria-hidden="true">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// Types for our component props
export interface MarqueeItem {
  id: string | number;
  content: React.ReactNode;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number; // pixels per second
  direction?: "left" | "right";
  gap?: number; // gap between items in pixels
  pauseOnHover?: boolean;
  gradient?: boolean;
  gradientColor?: string;
  gradientWidth?: number;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  speed = 30,
  direction = "left",
  gap = 40,
  pauseOnHover = false,
  gradient = false,
  gradientColor = "white",
  gradientWidth = 200,
}) => {
  return (
    <Marquee
      speed={speed}
      direction={direction}
      pauseOnHover={pauseOnHover}
      gradient={gradient}
      gradientColor={gradientColor}
      gradientWidth={gradientWidth}
      autoFill
    >
      {items.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="flex-shrink-0"
          style={{ marginRight: `${gap}px` }}
        >
          {item.content}
        </div>
      ))}
    </Marquee>
  );
};

export default InfiniteMarquee;
