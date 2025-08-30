"use client";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { Table, TableColumn } from "components/table/Table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { orderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { OrderHistory } from "../orderHistory.types";
import Chip from "components/Chip";
import { getOrderStatusColor } from "utils/statusColors";
import { SupportedCurrency } from "types/currency";

type OrderHistoryTableProps = {
  orderHistoryData: OrderHistory[];
};

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = (props) => {
  const { orderHistoryData } = props;

  const columns: TableColumn<OrderHistory>[] = [
    {
      header: "Order ID",
      accessor: "orderId",
    },
    {
      header: "Price",
      accessor: "finalPayment",
      cell: (val, row) => (
        <CurrencyDisplay
          amount={val}
          className="!text-sm font-normal"
          fixedCurrency={{
            code: row?.currencyCountry as SupportedCurrency,
            rate: row?.currencyRate,
          }}
        />
      ),
    },
    {
      header: "Status",
      accessor: "orderStatus",
      cell: (val) => (
        <Chip
          color={getOrderStatusColor(val)}
          label={orderStatusMapper[val] || ""}
        />
      ),
    },
    {
      header: "Purchase Date",
      accessor: "createdDate",
      cell: (val) => dayjs(val).format("DD MMM YYYY - hh:mm A") || "",
    },
    {
      header: "View Details",
      accessor: "_id",
      cell: (id) => (
        <Link
          href={ROUTES.ACCOUNT.ORDER_DETAILS(id)}
          className="hover:[&>*]:bg-blue-light"
        >
          <Icon
            name="chevron"
            iconType="stroke"
            className="ml-8 -rotate-90 rounded-full p-0.5"
            color="var(--neutral-400)"
          />
        </Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={orderHistoryData}
      emptyMessage="No orders placed yet"
    />
  );
};

export default OrderHistoryTable;
