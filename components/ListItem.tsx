import React from "react";
import { cn } from "utils/helpers";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { CurrencyDisplayProps } from "types/currency";

type ListItemProps = {
  label: string;
  value: any;
  className?: string;
  isBold?: boolean;
  isCurrency?: boolean;
  variant?: "1" | "2";
  fixedCurrency?: CurrencyDisplayProps["fixedCurrency"];
};

const ListItem: React.FC<ListItemProps> = (props) => {
  const { label, value, className, isBold, isCurrency, fixedCurrency } = props;

  return (
    <div
      className={cn(
        `mb-1.5 flex items-center ${
          isBold ? "[&>*]:text-base [&>*]:font-semibold" : ""
        } justify-between`,
        className,
      )}
    >
      <span className={`${isBold ? "text-neutral-500" : "text-neutral-400"}`}>
        {" "}
        {label}{" "}
      </span>

      {isCurrency ? (
        <CurrencyDisplay
          amount={value}
          className={`${isBold ? "text-base font-semibold" : "text-sm"}`}
          fixedCurrency={fixedCurrency}
        />
      ) : (
        <span className={`font-medium`}> {value} </span>
      )}
    </div>
  );
};

export default ListItem;
