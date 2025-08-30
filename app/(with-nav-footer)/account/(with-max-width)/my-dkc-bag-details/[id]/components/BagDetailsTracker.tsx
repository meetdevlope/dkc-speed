"use client";

import React from "react";
import { jsonParser } from "utils/helpers";
import { OrderStatusList } from "../action";
import { TrackerItem } from "components/tracker/tracker.types";
import { ReturnBagStatusTypes } from "enums/returnBagType.enum";
import { returnBagStatusMapper } from "utils/mappers";
import dayjs from "dayjs";
import Tracker from "components/tracker/Tracker";

type BagDetailsTrackerProps = {
  orderStatusList: string;
  currentStatus: string;
};

const BagDetailsTracker: React.FC<BagDetailsTrackerProps> = (props) => {
  const { orderStatusList, currentStatus } = props;

  const orderStatusListParsed: OrderStatusList[] = jsonParser(orderStatusList);

  const orderStatusMap = orderStatusListParsed.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.status] = item.time;
      return acc;
    },
    {},
  );

  const trackerData: TrackerItem[] = Object.entries(returnBagStatusMapper)
    .filter(([status]) => status !== ReturnBagStatusTypes.cancelled)
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

export default BagDetailsTracker;
