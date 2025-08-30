"use client";

import React from "react";

import Icon from "components/icon/Icon";
import { Table, TableColumn } from "components/table/Table";
import dayjs from "dayjs";
import Link from "next/link";
import { returnBagStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { MyDKCBags } from "../myDKCBags.types";
import Chip from "components/Chip";
import { getReturnBagStatusColor } from "utils/statusColors";

type MyDKCBagsTableProps = {
  myDKCBagsData: MyDKCBags[];
};

const MyDKCBagsTable: React.FC<MyDKCBagsTableProps> = (props) => {
  const { myDKCBagsData } = props;

  return (
    <Table
      columns={columns}
      data={myDKCBagsData}
      emptyMessage="No bags ordered yet"
    />
  );
};

const columns: TableColumn<MyDKCBags>[] = [
  {
    header: "SKU ID",
    accessor: "skuId",
  },
  {
    header: "Status",
    accessor: "orderStatus",
    cell: (val) => (
      <Chip
        label={returnBagStatusMapper[val] || ""}
        color={getReturnBagStatusColor(val)}
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
        href={ROUTES.ACCOUNT.My_DKC_BAG_DETAILS(id)}
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

export default MyDKCBagsTable;
