"use client";

import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { Table, TableColumn } from "components/table/Table";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { MyRentals } from "types/rent.types";
import { rentOrderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getReturnOrderStatusColor } from "utils/statusColors";

type MyRentalsTableProps = {
  myRentalsData: MyRentals[];
};

const MyRentalsTable: React.FC<MyRentalsTableProps> = (props) => {
  const { myRentalsData } = props;

  const columns: TableColumn<MyRentals>[] = [
    {
      header: "SKU ID",
      accessor: "skuId",
    },
    {
      header: "Price",
      accessor: "finalPayment",
      cell: (val) => (
        <CurrencyDisplay amount={val} className="!text-sm font-normal" />
      ),
    },
    {
      header: "Rent Start Date",
      accessor: "rentStartDate",
      cell: (val) => (val ? dayjs(val).format("DD MMM YYYY - hh:mm A") : "-"),
    },
    {
      header: "Rent End Date",
      accessor: "rentEndDate",
      cell: (val) => (val ? dayjs(val).format("DD MMM YYYY - hh:mm A") : "-"),
    },
    {
      header: "Rental Duration",
      accessor: "rentDays",
      cell: (val) => <> {val} days </>,
    },
    {
      header: "Status",
      accessor: "orderStatus",
      cell: (value) => (
        <Chip
          label={rentOrderStatusMapper[value] || ""}
          color={getReturnOrderStatusColor(value)}
        />
      ),
    },
    {
      header: "Ordered on",
      accessor: "createdDate",
      cell: (value) => dayjs(value).format("DD MMM YY - hh:mm A") || "",
    },
    {
      header: "View Details",
      accessor: "_id",
      cell: (id) => (
        <Link
          href={ROUTES.ACCOUNT.RENT_ORDER_DETAILS(`?rentOrderId=${id}`)}
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
      data={myRentalsData}
      emptyMessage="No products rented yet"
    />
  );
};

export default MyRentalsTable;
