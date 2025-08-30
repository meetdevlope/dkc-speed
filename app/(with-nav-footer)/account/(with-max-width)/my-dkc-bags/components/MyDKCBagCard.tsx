import Chip from "components/Chip";
import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { returnBagStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getReturnBagStatusColor } from "utils/statusColors";
import { MyDKCBags } from "../myDKCBags.types";

const MyDKCBagCard: React.FC<MyDKCBags> = (props) => {
  const { skuId, createdDate, orderStatus, _id } = props;

  return (
    <Link href={ROUTES.ACCOUNT.My_DKC_BAG_DETAILS(_id)}>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h6 className="font-medium tracking-wider">{skuId}</h6>

          <Chip
            label={returnBagStatusMapper[orderStatus] || ""}
            color={getReturnBagStatusColor(orderStatus)}
          />
        </div>
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
      </div>
    </Link>
  );
};

export default MyDKCBagCard;
