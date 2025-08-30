import React from "react";

type TileSelectorProps = {
  number: number;
  onClick: () => void;
  selectedTile: number;
};

const TileSelector: React.FC<TileSelectorProps> = (props) => {
  const { number = 1, onClick, selectedTile } = props;

  return (
    <div
      className="flex min-w-5 cursor-pointer items-center justify-center gap-1 hover:scale-95"
      onClick={onClick}
    >
      {Array(number)
        .fill(null)
        .map((item, index) => (
          <div
            key={index}
            className={`h-3 w-[3px] rounded-[0.5px] transition-all duration-300 ${
              selectedTile === number ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
    </div>
  );
};

export default TileSelector;
