import Tracker from "components/tracker/Tracker";
import { TrackerItem } from "components/tracker/tracker.types";
import dayjs from "dayjs";
import React from "react";
import { PreOrderSkuStatusLabels } from "utils/mappers";
import { PreOrderSkuStatusTypes } from "../../action";

type PreOrderTrackerProps = {
  statusList: Record<string, string>[];
  currentStatus: PreOrderSkuStatusTypes;
};

const PreOrderSkuTracker: React.FC<PreOrderTrackerProps> = (props) => {
  const { statusList, currentStatus } = props;

  const orderStatusMap = statusList.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.status] = item.time;
      return acc;
    },
    {},
  );

  const trackerData: TrackerItem[] = Object.entries(PreOrderSkuStatusLabels)
    .filter(
      ([status]) =>
        !excludedStatuses.includes(status as PreOrderSkuStatusTypes),
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

export default PreOrderSkuTracker;

const excludedStatuses = [
  PreOrderSkuStatusTypes.inventory_ordered,
  PreOrderSkuStatusTypes.inventory_received,
  PreOrderSkuStatusTypes.cancelled,
];
