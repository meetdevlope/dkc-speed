import React, { useState } from "react";
import useDelayedLoading from "hooks/useDelayedLoading";
import Pagination, { PaginationProps } from "./Pagination";
import NoData from "components/NoData";

export type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  filterComponent?: React.ReactNode;
  pagination?: PaginationProps;
  sortable?: boolean;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  loading?: boolean;
  emptyMessage?: string;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  filterComponent,
  pagination,
  sortable = false,
  loading = false,
  emptyMessage = "No data available",
  onSort,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof T) => {
    if (!sortable || !onSort) return;

    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  const renderCell = (row: T, column: TableColumn<T>) => {
    const value =
      typeof column.accessor === "function"
        ? column.accessor(row)
        : row[column.accessor];

    return column.cell ? column.cell(value, row) : value;
  };

  const delayedLoading = useDelayedLoading(loading);

  return (
    <div className="flex flex-col bg-white sm:rounded-xl">
      {filterComponent && <div className="p-5">{filterComponent}</div>}

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-neutral-100 sm:rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="text-secondary-900 px-6 py-4 text-left text-xs font-medium tracking-wider uppercase"
                      onClick={() => {
                        if (
                          sortable &&
                          typeof column.accessor === "string" &&
                          column.sortable
                        ) {
                          handleSort(column.accessor);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {column.header}
                        {sortable &&
                          typeof column.accessor === "string" &&
                          column.sortable && (
                            <span className="ml-1">
                              {sortColumn === column.accessor ? (
                                sortDirection === "asc" ? (
                                  "↑"
                                ) : (
                                  "↓"
                                )
                              ) : (
                                <span className="text-gray-300">↕</span>
                              )}
                            </span>
                          )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100/70 bg-white">
                {data?.length > 0 &&
                  !delayedLoading &&
                  data?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50/40">
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 text-sm font-normal whitespace-nowrap text-gray-500"
                        >
                          {renderCell(row, column)}
                        </td>
                      ))}
                    </tr>
                  ))}
                {data?.length < 1 && !delayedLoading && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      <NoData title={emptyMessage} />
                    </td>
                  </tr>
                )}
                {delayedLoading && (
                  <>
                    {Array(10)
                      .fill(null)
                      .map((_, i) => (
                        <tr key={i}>
                          {Array(columns.length || 4)
                            .fill(null)
                            .map((_, i) => (
                              <td key={i} className="h-[54px] p-1 text-center">
                                <div className="shimmer h-full rounded-sm bg-gray-200/70"></div>
                              </td>
                            ))}
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pagination && <Pagination {...pagination} isLoading={delayedLoading} />}
    </div>
  );
}
