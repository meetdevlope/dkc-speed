import Tracker from "components/tracker/Tracker";
import { TrackerItem } from "components/tracker/tracker.types";
import dayjs from "dayjs";
import React from "react";
import { PreOrderStatusLabels } from "utils/mappers";
import { PreOrderStatusTypes } from "../../action";

type PreOrderTrackerProps = {
  statusList: Record<string, string>[];
  currentStatus: PreOrderStatusTypes;
};

const PreOrderTracker: React.FC<PreOrderTrackerProps> = (props) => {
  const { statusList, currentStatus } = props;

  const orderStatusMap = statusList.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.status] = item.time;
      return acc;
    },
    {},
  );

  const trackerData: TrackerItem[] = Object.entries(PreOrderStatusLabels)
    .filter(
      ([status]) => !excludedStatuses.includes(status as PreOrderStatusTypes),
    )
    .map(([status, label]) => {
      const time = orderStatusMap[status];

      return {
        upperJsx: {
          primaryText: label,
        },
        lowerJsx: {
          secondaryText: time ? dayjs(time).format("hh:mm A") : "",
          primaryText: time ? dayjs(time).format("DD-MMM-YY") : "",
        },
        statusKey: status,
      };
    });

  return <Tracker data={trackerData} currentStatus={currentStatus} />;
};

export default PreOrderTracker;

const excludedStatuses = [PreOrderStatusTypes.cancelled];
