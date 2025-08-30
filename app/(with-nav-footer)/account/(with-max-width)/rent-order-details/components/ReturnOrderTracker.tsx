"use client";

import React from "react";
import { OrderStatusList } from "../../my-dkc-bag-details/[id]/action";
import { jsonParser } from "utils/helpers";
import { TrackerItem } from "components/tracker/tracker.types";
import { rentOrderStatusMapper } from "utils/mappers";
import { RentOrderStatusTypes } from "enums/rentOrderStatusTypes";
import dayjs from "dayjs";
import Tracker from "components/tracker/Tracker";

type ReturnOrderTrackerProps = {
  orderStatusList: string;
  currentStatus: string;
};

const ReturnOrderTracker: React.FC<ReturnOrderTrackerProps> = (props) => {
  const { currentStatus, orderStatusList } = props;

  const rentStatusListParsed: OrderStatusList[] = jsonParser(orderStatusList);

  const rentReturnStatusMap = rentStatusListParsed?.reduce<
    Record<string, string>
  >((acc, item) => {
    acc[item.status] = item.time;
    return acc;
  }, {});

  const trackerData: TrackerItem[] = Object.entries(rentOrderStatusMapper)
    .filter(([status]) => status !== RentOrderStatusTypes.cancelled)
    .map(([status, label]) => {
      const time = rentReturnStatusMap[status];

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

export default ReturnOrderTracker;
