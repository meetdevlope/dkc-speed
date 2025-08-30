"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "components/Button";
import DatePicker, {
  DisabledDateRange,
} from "components/datepicker/DatePicker";
import Dialog from "components/Dialog";
import Drawer from "components/Drawer";
import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import { CartTypeEnum } from "enums/cartType.enum";
import { DiscountTypeEnum } from "enums/discountType.enum";
import { useToggle } from "hooks/useToggle";
import React, { useCallback, useMemo, useState } from "react";
import { Product, RentPriceDistribution } from "types/product.types";
import { isNullish, jsonParser } from "utils/helpers";
import { RentUtils } from "utils/rent";
import { getRentedDates } from "../../[slug]/action";
import AddToCartButton from "../add-to-cart/AddToCartButton";
import RentalPeriodItem from "./RentalPeriodItem";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { useLocalizationStore } from "store/localizationStore";

type RentWithAddToCartProps = {
  price: number;
  token: string;
  deviceId: string;
  skuId: string;
  rentDiscountType: DiscountTypeEnum;
  rentPriceDistribution: string;
  rentPrice: number;
  originalPrice: number;
  productId: string;
  disabled?: boolean;
  disableMessage?: string;
  name?: string;
  image?: string;
  options?: Product["options"];
};

const RentWithAddToCart: React.FC<RentWithAddToCartProps> = (props) => {
  const {
    price,
    deviceId,
    token,
    skuId,
    rentDiscountType,
    rentPrice,
    rentPriceDistribution,
    originalPrice,
    productId,
    disabled,
    disableMessage,
    name,
    image,
    options,
  } = props;

  const [selectedRentDays, setSelectedRentDays] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const { country, loading, error } = useLocalizationStore();

  const { isOpen, open, close } = useToggle();

  const handleRentalPeriodChange = useCallback((period: number) => {
    setSelectedRentDays(period);
  }, []);

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  }, []);

  const rentEndDate = useMemo(
    () => dayjs(selectedDate).add(selectedRentDays, "day"),
    [selectedDate, selectedRentDays],
  );

  const rentPriceDistributionData: RentPriceDistribution[] = jsonParser(
    rentPriceDistribution,
  );

  const rentDiscount = useMemo(
    () =>
      Number(
        rentPriceDistributionData?.find((e) => e?.days === selectedRentDays)
          ?.discount,
      ) || 0,
    [rentPriceDistributionData, selectedRentDays],
  );

  const getRentTotalRequest = {
    days: selectedRentDays,
    perDayPrice: rentPrice,
    discountType: rentDiscountType,
    discount: rentDiscount,
  };

  const showRentalDetails = useMemo(
    () => selectedDate && !isNullish(selectedRentDays) && selectedRentDays > 0,
    [selectedDate, selectedRentDays],
  );

  const { data: rentedDates } = useQuery({
    queryKey: [`rented-dates-${productId}`],
    queryFn: () => getRentedDates(token, productId),
    enabled: isOpen,
  });

  const disabledDateRange = useMemo<DisabledDateRange>(
    () =>
      (rentedDates || []).map((item) => ({
        start: new Date(item?.rentStartDate),
        end: new Date(item?.rentEndDate),
      })),
    [rentedDates],
  );

  const rentData = () => (
    <div className="rounded-xl bg-blue-light p-2">
      <h6 className="font-medium"> Rental Period</h6>
      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-6 md:gap-6">
        {rentPriceDistributionData.map((item, index) => (
          <RentalPeriodItem
            key={index}
            days={item.days}
            discount={item.discount}
            discountType={rentDiscountType}
            price={
              RentUtils.getRentTotal({
                days: item.days,
                discount: item.discount,
                discountType: rentDiscountType,
                perDayPrice: rentPrice,
              }) || 0
            }
            onClick={() => handleRentalPeriodChange(item.days)}
            selected={selectedRentDays === item.days}
          />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <h6>Choose delivery date</h6>
        <DatePicker
          selected={selectedDate}
          onChange={(newDate) => handleDateChange(newDate)}
          disabledDateRange={disabledDateRange}
          disablePastDates
          maxDate={dayjs().add(3, "month").toDate()}
        />
        {(!selectedDate || !selectedRentDays) && (
          <h6 className="pl-1 text-neutral-400">
            *Rental period and dates are mandatory
          </h6>
        )}
        {showRentalDetails && (
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon name="calendar-arrow" iconType="stroke" />
              <h6 className="md:text-base">
                Arrives by{" "}
                <span className="font-semibold">
                  {dayjs(selectedDate).format("dddd, D MMM YYYY")}
                </span>
              </h6>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                name="calendar-arrow"
                iconType="stroke"
                className="-scale-x-100"
              />

              <h6 className="md:text-base">
                Return by{" "}
                <span className="font-semibold">
                  {dayjs(selectedDate)
                    .add(selectedRentDays, "day")
                    .format("dddd, D MMM YYYY")}
                </span>
              </h6>
            </div>
          </div>
        )}
        {showRentalDetails && (
          <div className="mt-6 flex items-center gap-2">
            <h5>Total : </h5>
            {RentUtils.getRentTotal(getRentTotalRequest) === "FREE" ? (
              <h6 className="font-semibold">FREE</h6>
            ) : (
              <CurrencyDisplay
                amount={RentUtils.getRentTotal(getRentTotalRequest) || 0}
                className="text-base font-semibold"
              />
            )}
          </div>
        )}
        <div className="mt-8">
          <AddToCartButton
            token={token as string}
            deviceId={deviceId as string}
            cartType={CartTypeEnum.product_rent}
            rentStartDate={selectedDate}
            rentEndDate={rentEndDate.toDate()}
            skuId={skuId}
            disabled={!selectedDate || !selectedRentDays}
            price={RentUtils.getRentTotalDigits(getRentTotalRequest) || 0}
            rentDays={selectedRentDays}
            originalPrice={RentUtils.getRentOriginalPrice(
              rentPrice,
              selectedRentDays,
            )}
            // disableMessage={disableMessage}
            discountType={rentDiscountType}
            discount={rentDiscount}
            image={image}
            name={name}
            options={options}
          />
        </div>
      </div>
    </div>
  );

  const isUK = country?.value === "GB";

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-start gap-2">
          <AddToCartButton
            token={token as string}
            deviceId={deviceId as string}
            cartType={CartTypeEnum.product_purchase}
            skuId={skuId}
            price={price}
            originalPrice={originalPrice}
            disabled={disabled}
            disableMessage={disableMessage}
            buttonText="Buy"
            image={image}
            name={name}
            options={options}
          />
          <div className="w-full">
            <Button
              fullWidth
              className="border-primary-500 font-medium text-primary-500"
              onClick={open}
              variant="outline"
              disabled={!isUK}
            >
              Rent
            </Button>
            {loading && (
              <span className="text-xs text-gray-500">
                Checking your location…
              </span>
            )}

            {error && (
              <span className="text-xs text-red-500">
                Location error: {error}
              </span>
            )}

            {!loading && !isUK && !error && (
              <div className="m-1 text-xs text-gray-700">
                <p className="m-0">*Rent supported only in UK</p>
                <p className="m-0">
                  Currently: {country?.label} {country?.value ?? "Unknown"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden cursor-auto md:block">
        <Dialog title="Rent Product" isOpen={isOpen} onClose={close} noClose>
          {rentData()}
        </Dialog>
      </div>
      <div className="block md:hidden">
        <Drawer isOpen={isOpen} onClose={close} direction="down">
          {rentData()}
        </Drawer>
      </div>
    </>
  );
};

export default RentWithAddToCart;
