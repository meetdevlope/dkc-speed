import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { orderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getOrderStatusColor } from "utils/statusColors";
import { OrderHistory } from "../orderHistory.types";

const OrderHistoryCard: React.FC<OrderHistory> = (props) => {
  const { orderId, finalPayment, orderStatus, createdDate, _id } = props;

  return (
    <Link href={ROUTES.ACCOUNT.ORDER_DETAILS(_id)}>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h6 className="font-medium tracking-wider">{orderId}</h6>
          <Chip
            color={getOrderStatusColor(orderStatus)}
            label={orderStatusMapper[orderStatus] || ""}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name="calendar"
              size={18}
              className="stroke-[1.6px]"
              color="var(--neutral-400)"
            />
            <h6 className="font-medium text-neutral-400">
              {dayjs(createdDate).format("DD MMM YY hh:mm A") || ""}
            </h6>
          </div>
          <div className="flex items-end">
            <CurrencyDisplay amount={finalPayment} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderHistoryCard;
