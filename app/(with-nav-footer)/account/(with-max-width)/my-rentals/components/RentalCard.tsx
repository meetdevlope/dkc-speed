import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import Link from "next/link";
import { MyRentals } from "types/rent.types";
import { rentOrderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getReturnOrderStatusColor } from "utils/statusColors";

type RentalCardProps = MyRentals;

const RentalCard: React.FC<RentalCardProps> = (props) => {
  const {
    skuId,
    orderStatus,
    createdDate,
    finalPayment,
    rentStartDate,
    rentEndDate,
    rentDays,
    _id,
  } = props;

  return (
    <Link href={ROUTES.ACCOUNT.RENT_ORDER_DETAILS(`?rentOrderId=${_id}`)}>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h6 className="font-medium tracking-wider">{skuId}</h6>
          <Chip
            label={rentOrderStatusMapper[orderStatus] || ""}
            color={getReturnOrderStatusColor(orderStatus)}
          />
        </div>
        <h6 className="mt-1 font-medium text-neutral-400">
          Ordered: {dayjs(createdDate).format("DD MMM YY") || ""} -{" "}
          {dayjs(createdDate).format("hh:mm A") || ""}
        </h6>
        <div className="my-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CurrencyDisplay className="font-semibold" amount={finalPayment} />
          </div>
          <div className="h-3 w-px bg-neutral-300"></div>
          <div className="flex items-center gap-1.5">
            <Icon
              name="clock"
              iconType="stroke"
              size={18}
              className="stroke-[1.6px]"
              color="var(--neutral-400)"
            />

            <span className="text-sm"> {rentDays} days </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Icon
            name="calendar"
            size={18}
            className="stroke-[1.6px]"
            color="var(--neutral-400)"
          />
          <h6 className="font-medium">
            {rentStartDate ? dayjs(rentStartDate).format("DD MMM YYYY") : "-"} →{" "}
            {rentEndDate ? dayjs(rentEndDate).format("DD MMM YYYY") : "-"}
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;
