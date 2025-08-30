import React from "react";
import { TimelineWidgetModel } from "types/cms/component.types";

interface TimelineWidgetProps {
  widgetConfig: TimelineWidgetModel;
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({
  widgetConfig: data,
}) => {
  const { timelineList } = data;

  if (!timelineList || (Array.isArray(timelineList) && timelineList.length < 0))
    return <></>;

  return (
    <div className="w-full">
      <div className="hidden rounded-lg md:block">
        <div className="relative mx-auto flex items-start justify-between">
          {timelineList.map((item, index) => (
            <div
              key={index}
              className="max-w- relative flex flex-1 flex-col items-start"
            >
              {timelineList?.length !== index + 1 && (
                <div className="absolute top-5 right-5 left-5 h-0.5 w-full bg-primary-500" />
              )}
              <div className="relative z-10 mb-4 ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-primary-500 text-sm font-bold text-white">
                <h6 className="font-medium">{item.step}</h6>
              </div>

              <div className="px-2">
                <p className="text-base leading-tight font-medium text-gray-800">
                  {item.label}
                </p>
                {item.description && (
                  <h6 className="mt-1 text-sm text-gray-500">
                    {" "}
                    {item.description}{" "}
                  </h6>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="block md:hidden">
        <div className="space-y-6">
          {timelineList.map((item, index) => (
            <div key={item.id} className="relative flex items-start">
              {index < timelineList.length - 1 && (
                <div className="absolute top-10 left-5 h-12 w-0.5 bg-primary-500"></div>
              )}

              <div className="relative z-10 mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white bg-primary-500 text-sm font-bold text-white">
                {item.step}
              </div>

              <div className="mt-1 flex-1">
                <h6 className="text-sm leading-tight font-medium text-gray-800">
                  {item.label}
                </h6>
                {item.description && (
                  <h6 className="mt-1 text-xs text-gray-500">
                    {" "}
                    {item.description}{" "}
                  </h6>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineWidget;
