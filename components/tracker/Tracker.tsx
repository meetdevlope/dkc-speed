"use client";

import React from "react";
import { TrackerProps } from "./tracker.types";
import useWindowSize from "hooks/useWindowSize";

const Tracker: React.FC<TrackerProps> = (props) => {
  const { data, currentStatus } = props;

  const isCurrentStatus = (statusKey: string) => statusKey === currentStatus;

  const { width } = useWindowSize();

  const isHorizontal: boolean = width > 850;

  const itemClass = `flex [&>*]:capitalize gap-2 ${
    isHorizontal ? "items-start" : "items-center"
  } w-full flex-col self-start`;

  return (
    <div className={`flex ${isHorizontal ? "flex-row" : "flex-col"}`}>
      {data.map((item, index) => {
        const isActive = isCurrentStatus(item.statusKey);
        const activeIndex = data.findIndex(
          (e) => e.statusKey === currentStatus,
        );
        const isCompleted = index < activeIndex;

        const isLastItem = data.length === index + 1;
        const isFirstItem = index === 0;

        return (
          <div
            key={item.statusKey}
            className={`flex min-h-16 w-full ${
              isHorizontal ? "flex-col gap-10" : "flex-row"
            }`}
          >
            <div className={itemClass}>
              <p className="text-neutral-400">
                {item.upperJsx?.secondaryText}{" "}
              </p>
              <h6 className="two-lines-ellipsis h-10 max-w-32 text-center font-medium sm:max-w-max">
                {item.upperJsx?.primaryText}{" "}
              </h6>
            </div>
            <div
              className={`divider relative ${
                isHorizontal
                  ? `h-1 ${isLastItem ? "w-9 rounded-r-md" : "w-full"} ${
                      isFirstItem ? "rounded-l-md" : ""
                    } ${item?.lowerJsx?.primaryText ? "mt-auto" : ""} `
                  : ` ${isLastItem ? "h-6 rounded-b-md" : "min-h-20"} ${
                      isFirstItem ? "rounded-t-md" : ""
                    } w-3`
              } ${isCompleted ? "bg-black" : "bg-neutral-100"}`}
            >
              {isActive && (
                <>
                  <span
                    className={`absolute bg-black ${
                      isHorizontal
                        ? "h-1 w-5"
                        : "-top-1 left-[3px] h-4 w-1.5 -translate-x-1/2"
                    } `}
                  ></span>
                  <span
                    className={`absolute top-1 ${
                      isHorizontal
                        ? "top-0 left-4 -translate-y-2/3"
                        : "top-2 -translate-x-[38%]"
                    } fall size-6 rounded-full bg-black`}
                  >
                    <span className="size-3 rounded-full bg-white"></span>
                  </span>
                </>
              )}
            </div>
            <div className={itemClass}>
              <h6 className="two-lines-ellipsis font-medium">
                {" "}
                {item.lowerJsx?.primaryText}{" "}
              </h6>
              <p className="text-neutral-400">
                {" "}
                {item.lowerJsx?.secondaryText || "-"}{" "}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tracker;
