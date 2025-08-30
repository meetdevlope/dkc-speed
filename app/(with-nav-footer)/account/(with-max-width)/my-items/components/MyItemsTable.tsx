"use client";

import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import { Table, TableColumn } from "components/table/Table";

import Link from "next/link";
import React, { useMemo } from "react";
import { PaginatedResponse } from "types/baseApiTypes";
import { Product } from "types/product.types";
import { getSizeFromOptions } from "utils/helpers";
import { productStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getProductStatusColor } from "utils/statusColors";

type MyItemsTableProps = {
  myItemsData: PaginatedResponse<Product>;
};

const MyItemsTable: React.FC<MyItemsTableProps> = (props) => {
  const { myItemsData } = props;
  const { data: myItems } = myItemsData || {};

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        header: "Image",
        accessor: "photos",
        cell: (photos, row) => {
          return (
            <div className="relative aspect-3/4 w-12">
              <ImageComponent
                src={photos?.[0] || ""}
                alt={`${row?.name}-alt`}
                fill
                className="rounded-md"
              />
            </div>
          );
        },
      },
      {
        header: "Name",
        accessor: "name",
      },
      {
        header: "Price",
        accessor: "sellingPrice",
        cell: (val) => <CurrencyDisplay amount={val} />,
      },
      {
        header: "Size",
        accessor: "options",
        cell: (val) => getSizeFromOptions(val),
      },
      {
        header: "Status",
        accessor: "productStatus",
        cell: (val) => (
          <Chip
            label={productStatusMapper[val]}
            color={getProductStatusColor(val)}
          />
        ),
      },
      {
        header: "View Details",
        accessor: "skuId",
        cell: (id) => (
          <Link
            href={ROUTES.ACCOUNT.MY_ITEM_DETAILS(id)}
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
    ],
    [],
  );

  return (
    <Table columns={columns} data={myItems} emptyMessage="No items sent yet" />
  );
};

export default MyItemsTable;
