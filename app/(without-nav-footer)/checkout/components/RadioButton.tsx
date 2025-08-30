import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { cn } from "utils/helpers";

type RadioButtonProps = {
  name: string;
  logo?: string;
  selected: boolean;
  onClick: () => void;
  variant?: "1" | "2";
  color?: "primary" | "secondary";
  className?: string;
};

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const {
    name,
    logo,
    selected,
    onClick,
    variant = "1",
    color = "secondary",
    className,
  } = props;

  return (
    <>
      {variant === "1" && (
        <button
          className={cn(
            `flex items-center justify-between border px-4 ${
              selected ? "bg-beige" : "bg-white"
            } ${selected ? "bg-beige" : "bg-white"} ${selected ? "border-secondary" : "border-gray-100"} `,
            className,
          )}
          onClick={onClick}
        >
          <span className="flex items-center gap-4 py-5">
            <input type="radio" checked={selected} />
            <h6 className="text-primary1 font-semibold"> {name} </h6>
          </span>
          {logo && (
            <span className="relative size-10">
              <ImageComponent
                src={logo || ""}
                fill
                alt={`${name}-img`}
                objectFit="contain"
              />
            </span>
          )}
        </button>
      )}

      {variant === "2" && (
        <button
          className={cn(
            `flex items-center justify-between p-4 ${
              color === "primary" ? "bg-primary1" : "bg-secondary"
            } `,
            className,
          )}
          onClick={onClick}
        >
          <span className="flex w-full justify-between">
            <h6
              className={`text-primary1 font-semibold ${
                color === "primary" ? "text-off-white" : "text-primary1"
              }`}
            >
              {name}
            </h6>
            <input
              type="radio"
              checked={selected}
              className={`${
                color === "primary" ? "!accent-white" : "!accent-primary1"
              }`}
            />
          </span>
          {logo && (
            <span className="relative size-16">
              <ImageComponent src={logo || ""} fill alt={`${name}-img`} />
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default RadioButton;
