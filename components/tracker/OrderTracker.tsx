"use client";

import React from "react";
import Tracker from "./Tracker";
import { TrackerItem } from "./tracker.types";
import { orderStatusMapper } from "utils/mappers";
import { OrderStatusEnum } from "enums/orderStatus.enum";
import dayjs from "dayjs";

type OrderTrackerProps = {
  statusList: Record<string, string>[];
  currentStatus: OrderStatusEnum;
};

const OrderTracker: React.FC<OrderTrackerProps> = (props) => {
  const { statusList, currentStatus } = props;

  const orderStatusMap = statusList.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.status] = item.time;
      return acc;
    },
    {},
  );

  const trackerData: TrackerItem[] = Object.entries(orderStatusMapper)
    .filter(([status]) => status !== OrderStatusEnum.cancelled)
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

export default OrderTracker;
