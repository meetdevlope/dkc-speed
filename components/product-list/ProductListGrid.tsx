"use client";
import Filters from "app/(with-nav-footer)/products/components/filters/Filters";
import SortBy from "app/(with-nav-footer)/products/components/filters/SortBy";
import Spinner from "components/spinner/Spinner";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { Collection } from "types/collection.types";
import { v4 } from "uuid";
import Pagination, { PaginationProps } from "./Pagination";
import ProductListSkeleton from "./ProductListSkeleton";

type GridLayout = 3 | 4 | 5;

const GRID_LAYOUT_STORAGE_KEY = "preferred-grid-layout";

type ProductListGridProps = {
  totalItems?: number;
  children: ReactNode;
  pageFilters?: Collection["pageFilters"];
  pageTitle?: ReactNode;
  withHeader?: boolean;
  withSorting?: boolean;
  trailingComponent?: ReactNode;
} & (
  | {
      withPagination?: false;
    }
  | {
      withPagination?: true;
      paginationProps: PaginationProps;
    }
);

const GridLayoutButton: React.FC<{
  layout: GridLayout;
  currentLayout: GridLayout;
  onClick: (layout: GridLayout) => void;
}> = ({ layout, currentLayout, onClick }) => {
  const isActive = layout === currentLayout;

  return (
    <button
      onClick={() => onClick(layout)}
      className={`flex cursor-pointer items-center gap-1 rounded-sm border border-transparent p-1.5 transition-all duration-200 ${
        isActive ? "bg-blue-light" : "hover:border-neutral-200"
      }`}
      aria-label={`Show ${layout} products per row`}
    >
      {Array.from({ length: layout }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-[3px] rounded-[0.5px] transition-all duration-300 ${isActive ? "bg-neutral-500" : "bg-neutral-200"}`}
        />
      ))}
    </button>
  );
};

const ProductListGrid: React.FC<ProductListGridProps> = (props) => {
  const {
    children,
    pageFilters,
    withPagination,
    pageTitle,
    withHeader = true,
    withSorting = false,
    trailingComponent,
  } = props;

  const uniqueId = v4();

  const [gridLayout, setGridLayout] = useState<GridLayout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLayout = localStorage.getItem(GRID_LAYOUT_STORAGE_KEY);
      const parsedLayout = parseInt(savedLayout || "", 10);

      if ([3, 4, 5].includes(parsedLayout)) {
        setGridLayout(parsedLayout as GridLayout);
      } else {
        setGridLayout(4);
      }
    }
  }, []);

  useEffect(() => {
    if (gridLayout !== null && typeof window !== "undefined") {
      localStorage.setItem(GRID_LAYOUT_STORAGE_KEY, gridLayout.toString());
    }
  }, [gridLayout]);

  if (gridLayout === null) return <Spinner />;

  const getGridClasses = (layout: GridLayout) => {
    switch (layout) {
      case 3:
        return "grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-2 md:grid-cols-4";
      case 5:
        return "grid-cols-2 md:grid-cols-5";
      default:
        return "grid-cols-2 md:grid-cols-5";
    }
  };

  const noProducts = React.Children.count(children) === 0;

  return (
    <div className="mt-4">
      {withHeader && (
        <>
          {!noProducts && (
            <div className="mb-8 flex flex-col items-center justify-between gap-4 border-t border-b border-neutral-100 md:flex-row">
              {pageTitle}
              <div className="flex w-full items-center gap-x-3">
                <div className="mr-auto hidden items-center gap-3 py-3 pl-4 md:flex">
                  <GridLayoutButton
                    layout={3}
                    currentLayout={gridLayout}
                    onClick={setGridLayout}
                  />
                  <GridLayoutButton
                    layout={4}
                    currentLayout={gridLayout}
                    onClick={setGridLayout}
                  />
                  <GridLayoutButton
                    layout={5}
                    currentLayout={gridLayout}
                    onClick={setGridLayout}
                  />
                </div>
                {pageFilters && (
                  <div className="fall grow border-r border-neutral-100 py-4 pr-4 md:grow-0">
                    <Filters data={pageFilters || []} />
                  </div>
                )}
                {withSorting &&
                  withPagination &&
                  props?.paginationProps?.totalRows > 0 && (
                    <div className="fall grow md:grow-0">
                      <SortBy />
                    </div>
                  )}
                {trailingComponent && trailingComponent}
              </div>
            </div>
          )}
        </>
      )}

      <Suspense
        fallback={<ProductListSkeleton />}
        key={(withPagination && props.paginationProps?.currentPage) || uniqueId}
      >
        <div
          className={`product-list-grid grid gap-x-2 gap-y-10 transition-all duration-500 ${getGridClasses(gridLayout)}`}
        >
          {children}
        </div>
      </Suspense>

      {noProducts && (
        <div className="fall my-8 w-full flex-col gap-y-3">
          <h5 className="font-medium">No products found :(</h5>
        </div>
      )}

      {withPagination && props?.paginationProps?.totalRows > 0 && (
        <Pagination classname="mt-12" {...props.paginationProps} />
      )}
    </div>
  );
};

export default ProductListGrid;
