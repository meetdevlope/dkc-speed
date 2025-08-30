"use client";

import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import { CustomerCommission } from "enums/customerCommission.enum";
import { useToggle } from "hooks/useToggle";
import React from "react";
import { CommissionListTypes } from "../action";

const CommissionListItem: React.FC<CommissionListTypes> = (props) => {
  const {
    amount,
    commissionType,
    createdDate,
    orderId,
    isWithdrawn,
    transactionId,
    couponCode,
    addedFromBrandBag,
    isChargesDeducted,
    authenticationCharges,
    shipmentCharges,
  } = props;

  const { close, isOpen, open } = useToggle();

  return (
    <div className="flex items-center gap-x-6 rounded-xl border border-neutral-100 px-4 py-5 shadow-xs">
      <div
        className={`fall size-14 rounded-full border border-primary-400/10 ${isWithdrawn ? "bg-danger-500/10" : "bg-primary-light/60"}`}
      >
        <Icon
          name={isWithdrawn ? "trend-down" : "trending"}
          className={`stroke-[1.5px] ${isWithdrawn ? "text-danger-600" : "text-primary-400"}`}
          iconType="stroke"
        />
      </div>
      <div className="flex flex-col items-start gap-1.5">
        <div className="flex items-center gap-x-1">
          <Icon
            name="receipt"
            iconType="stroke"
            size={18}
            className="text-neutral-400"
          />
          <h6 className="font-medium text-neutral-500">
            {orderId || transactionId || couponCode}
          </h6>
        </div>
        <Chip
          color="gray"
          label={
            commissionType === CustomerCommission.CASH
              ? "As cash"
              : addedFromBrandBag
                ? "As brand credit points"
                : "As credit points"
          }
        />
        <div className="flex items-center gap-x-1">
          <Icon name="clock" iconType="stroke" size={14} />

          <p className="text-neutral-400">
            {dayjs(createdDate).format("DD MMM YYYY - hh:mm A")}
          </p>
        </div>
      </div>
      <div className="ml-auto flex flex-col gap-y-1">
        {isWithdrawn ? (
          <p className="mt-1 mr-1 text-right font-medium text-danger-500">
            Debited
          </p>
        ) : (
          <p className="mt-1 mr-1 text-right font-medium text-primary-500">
            Credited
          </p>
        )}
        <div
          className={`rounded-xl border border-primary-400/10 px-3 py-1 text-primary-500 ${isWithdrawn ? "bg-danger-500/10" : "bg-primary-light/60"}`}
        >
          {isWithdrawn ? (
            <span className="text-danger-600">-</span>
          ) : (
            <span className="text-primary-500"> + </span>
          )}{" "}
          <CurrencyDisplay
            amount={amount}
            className={`!text-sm font-medium ${isWithdrawn ? "text-danger-600" : "text-primary-500"}`}
          />
        </div>
        {isChargesDeducted && (
          <div
            className="flex cursor-pointer justify-end gap-x-1"
            onClick={open}
          >
            <Icon name="info" iconType="stroke" size={14} />
            <p className="text-right font-medium text-neutral-400">Charges</p>
          </div>
        )}
        <Dialog isOpen={isOpen} onClose={close} title="Charges">
          <div>
            <div className="flex items-center justify-between gap-x-2">
              <h6>Authentication charges</h6>
              {<CurrencyDisplay amount={authenticationCharges} />}
            </div>
            <div className="flex items-center justify-between gap-x-2">
              <h6>Shipping charges</h6>
              {<CurrencyDisplay amount={shipmentCharges} />}
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CommissionListItem;
