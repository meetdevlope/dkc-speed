import React from "react";
import { RatingBarData } from "utils/ratingsAverage";

export interface RatingBarProps {
  ratingData: RatingBarData[];
  className?: string;
}

const RatingBar: React.FC<RatingBarProps> = ({
  ratingData,
  className = "",
}) => {
  const sortedRatingData = [...ratingData].sort((a, b) => b.rating - a.rating);

  return (
    <div className={`flex w-full flex-col gap-y-2 ${className}`}>
      {sortedRatingData?.map((data) => (
        <div key={data.rating} className="flex w-full items-center">
          <div className="flex items-center">
            <h6 className="text-primary1/80 w-3 font-medium">{data?.rating}</h6>
            <svg
              className="text-primary1/80 ml-1 h-4 w-4"
              fill="gray"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>

          <div className="mx-4 h-2 flex-1 overflow-hidden rounded-xs bg-gray-200">
            <div
              className="h-full bg-[#FFB400]"
              style={{ width: `${data.percentage}%` }}
            ></div>
          </div>

          <h6 className="w-10 text-right font-normal text-gray-600">
            {data.percentage}%
          </h6>
        </div>
      ))}
    </div>
  );
};

export default RatingBar;
