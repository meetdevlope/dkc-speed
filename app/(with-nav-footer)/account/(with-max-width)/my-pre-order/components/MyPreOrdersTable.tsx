"use client";

import { Table, TableColumn } from "components/table/Table";
import React from "react";
import { PreOrder, PreOrderStatusTypes, ShipmentStatusTypes } from "../action";
import { PreOrderStatusLabels, ShipmentStatusLabels } from "utils/mappers";
import dayjs from "dayjs";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import Icon from "components/icon/Icon";

interface MyPreOrdersTableProps {
  myPreOrdersData: PreOrder[];
}

const MyPreOrdersTable: React.FC<MyPreOrdersTableProps> = (props) => {
  const { myPreOrdersData } = props;

  return (
    <Table
      columns={columns}
      data={myPreOrdersData}
      emptyMessage="No orders placed yet"
    />
  );
};

const columns: TableColumn<PreOrder>[] = [
  {
    header: "Order ID",
    accessor: "preOrderId",
  },
  {
    header: "Order Status",
    accessor: "orderStatus",
    cell: (val: PreOrderStatusTypes) => PreOrderStatusLabels[val] || val,
  },
  {
    header: "Shipping Status",
    accessor: "shippingStatus",
    cell: (val: ShipmentStatusTypes) => ShipmentStatusLabels[val] || val,
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    cell: (val) => dayjs(val).format("DD MMM YYYY - hh:mm A") || "",
  },
  {
    header: "Expected Delivery",
    accessor: "expDeliveryDate",
    cell: (val) => dayjs(val).format("DD MMM YYYY - hh:mm A") || "",
  },
  {
    header: "View Details",
    accessor: "_id",
    cell: (id) => (
      <Link
        href={ROUTES.ACCOUNT.MY_PRE_ORDERS.PRE_ORDER_DETAILS(id)}
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

export default MyPreOrdersTable;
