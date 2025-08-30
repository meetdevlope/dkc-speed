"use client";

import { useQuery } from "@tanstack/react-query";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import ToggleButton, { ToggleButtonType } from "components/ToggleButton";
import React, { useState } from "react";
import { CommissionStructureWidgetModel } from "types/cms/component.types";
import { CommissionTypes } from "types/commission.types";
import { getCommissionList } from "../action";

type CommissionGuiderProps = {
  widgetConfig: CommissionStructureWidgetModel;
};

const CommissionGuide: React.FC<CommissionGuiderProps> = (props) => {
  const { widgetConfig } = props || {};
  const { title } = widgetConfig || {};
  const [mode, setMode] = useState<CommissionTypes>(
    CommissionTypes.commissionCash,
  );

  const { data: commissions, isLoading } = useQuery({
    queryFn: () => getCommissionList(mode),
    queryKey: ["commission-guide", mode],
  });

  const handleToggleChange = (option: CommissionTypes) => {
    setMode(option);
  };

  const sortedCommissions = Array.isArray(commissions)
    ? [...commissions].sort((a, b) => a.startRange - b.startRange)
    : [];

  const formatPriceRange = (start: number, end: number | null) => {
    if (end === null) {
      return (
        <>
          {" "}
          <CurrencyDisplay
            amount={start}
            options={{
              decimalPlaces: 0,
            }}
          />{" "}
          +
        </>
      );
    }
    return (
      <>
        <CurrencyDisplay
          amount={start}
          options={{
            decimalPlaces: 0,
          }}
        />{" "}
        {" - "}
        <CurrencyDisplay amount={end} />
      </>
    );
  };

  const calculatePayout = (
    start: number,
    end: number | null,
    percent: number,
  ) => {
    if (end === null) {
      return (
        <>
          <CurrencyDisplay amount={(start * percent) / 100} /> +
        </>
      );
    }

    const minPayout = Math.round((start * percent) / 100);
    const maxPayout = Math.round((end * percent) / 100);

    return (
      <>
        <CurrencyDisplay
          amount={minPayout}
          options={{
            decimalPlaces: 0,
          }}
        />
        {" - "}
        <CurrencyDisplay
          amount={maxPayout}
          options={{
            decimalPlaces: 0,
          }}
        />
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between md:mb-8 lg:mb-12">
        <h4 className="text-left text-base lg:text-lg"> {title || ""} </h4>
        <ToggleButton
          options={options}
          onSelectionChange={handleToggleChange}
          className="col-span-2"
          initialSelected={mode}
        />
      </div>

      <div className="block md:hidden">
        <div className="mb-4 flex">
          <div className="w-1/2">
            <h6 className="font-medium text-neutral-400">Sold Price</h6>
          </div>
          <div className="w-1/2">
            <h6 className="font-medium text-neutral-400">Your Earnings </h6>
          </div>
        </div>

        {sortedCommissions.map((commission) => {
          const isInfinite = commission.endRange === 0;
          return (
            <div key={commission._id} className="flex items-center py-4">
              <div className="w-1/2 text-xl">
                <h6 className="font-medium">
                  {formatPriceRange(
                    commission.startRange,
                    isInfinite ? null : commission.endRange,
                  )}
                </h6>
              </div>
              <div className="w-1/2">
                <div className="flex items-center">
                  <div className="h-4 w-full overflow-hidden rounded-l-xs rounded-r-lg bg-neutral-100">
                    <div
                      className="h-full rounded-l-xs rounded-r-lg bg-primary-400"
                      style={{ width: `${commission.percent}%` }}
                    ></div>
                  </div>
                  <h6 className="ml-4 font-medium">{commission.percent}%</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden w-full md:block">
        <div className="mb-4 flex items-center justify-between">
          <div className="fall grow">
            <h6 className="mx-auto text-center font-medium text-neutral-400">
              SOLD PRICE
            </h6>
            <h6 className="text-right font-medium text-neutral-400">X</h6>
          </div>
          <div className="fall grow">
            <h6 className="mx-auto text-center text-neutral-400">
              YOUR EARNINGS
            </h6>
            <h6 className="text-right font-medium text-neutral-400">=</h6>
          </div>
          <div className="fall grow">
            <h6 className="text-center font-medium text-neutral-400">
              YOUR PAYOUT (£)
            </h6>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[365px] w-full flex-col gap-y-2 p-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div className="shimmer-loading h-full w-full" key={index} />
              ))}
          </div>
        ) : (
          <>
            {sortedCommissions.length > 0 ? (
              sortedCommissions.map((commission) => {
                const isInfinite = commission.endRange === 0;
                const priceRange = formatPriceRange(
                  commission.startRange,
                  isInfinite ? null : commission.endRange,
                );
                const payout = calculatePayout(
                  commission.startRange,
                  isInfinite ? null : commission.endRange,
                  commission.percent,
                );

                return (
                  <div
                    key={commission._id}
                    className="grid grid-cols-3 border-b border-b-neutral-100 py-6"
                  >
                    <div className="flex w-full items-center justify-center">
                      <h5 className="text-center font-medium">{priceRange}</h5>
                      {isInfinite && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-xs text-neutral-500">
                          i
                        </span>
                      )}
                    </div>

                    <div className="px-4">
                      <div className="relative">
                        <div className="h-6 w-full overflow-hidden rounded-r-full bg-neutral-100">
                          <div
                            className="flex h-full items-center rounded-r-full bg-primary-400 pl-4 font-medium text-black"
                            style={{
                              width: `${Math.min(commission.percent + 10, 100)}%`,
                            }}
                          >
                            <h6 className="font-medium text-neutral-100">
                              {commission.percent}%
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-center font-medium">{payout}</h5>
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-neutral-500">
                No commission data available
              </div>
            )}
          </>
        )}
      </div>
      <h6 className="mt-4 text-gray-500">
        * Green represents your payout, gray is the platform’s commission.
      </h6>
    </div>
  );
};

export default CommissionGuide;

const options: ToggleButtonType[] = [
  {
    key: CommissionTypes.customerCash,
    value: "cash",
  },
  {
    key: CommissionTypes.customerCredit,
    value: "credit",
  },
];
