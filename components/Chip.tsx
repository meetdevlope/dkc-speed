import React from "react";
import { cn } from "utils/helpers";

export type ChipColor =
  | "green"
  | "blue"
  | "red"
  | "yellow"
  | "purple"
  | "gray"
  | "sky"
  | "indigo"
  | "pink"
  | "teal"
  | "orange";

interface ChipProps {
  label: string;
  color?: ChipColor;
  className?: string;
}

const colorMap: Record<ChipColor, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-800" },
  blue: { bg: "bg-blue-100", text: "text-blue-800" },
  red: { bg: "bg-red-100", text: "text-red-800" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-800" },
  purple: { bg: "bg-purple-100", text: "text-purple-800" },
  sky: { bg: "bg-sky-100", text: "text-sky-800" },
  orange: { bg: "bg-orange-100", text: "text-orange-800" },
  gray: { bg: "bg-gray-100", text: "text-gray-800" },
  pink: { bg: "bg-pink-100", text: "text-pink-800" },
  teal: { bg: "bg-teal-100", text: "text-teal-800" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-800" },
};

const Chip: React.FC<ChipProps> = ({
  label,
  color = "gray",
  className = "",
}) => {
  const { bg, text } = colorMap[color];

  if (!label) return "-";

  return (
    <div
      className={cn(
        `inline-flex items-center justify-center rounded-lg px-1.5 py-1`,
        bg,
        className,
      )}
    >
      <span className={cn("text-xs font-medium", text)}>{label}</span>
    </div>
  );
};

export default Chip;
