import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "utils/helpers";

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  totalRows: number;
  currentRows: number;
};

const Pagination: React.FC<PaginationProps & { classname?: string }> = (
  props,
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentUrlPage = searchParams.get("currentPage");

  const {
    currentPage,
    totalPages,
    totalRows,
    classname,
    currentRows = 10,
  } = props;

  const [currentPageState, setCurrentPageState] = useState(currentPage || 1);
  const rowsPerPage = currentRows;

  // Calculate correct values for showing text
  const startRow = totalRows > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const currentRowsDisplay =
    totalRows > 0
      ? currentPage * rowsPerPage > totalRows
        ? totalRows
        : currentPage * rowsPerPage
      : 0;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageState(page);
      router.push(
        pathname + "?" + createQueryString("currentPage", page.toString()),
      );
      scrollToTop();
    }
  };

  useEffect(() => {
    if (currentUrlPage) {
      setCurrentPageState(Number(currentUrlPage));
    }
  }, [currentUrlPage]);

  // Function to generate page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    const maxVisiblePages = 5; // Total number of page buttons to show
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPageState - 1);
      let endPage = Math.min(currentPageState + 1, totalPages - 1);

      // Adjust if currentPage is near beginning or end
      if (currentPageState <= 3) {
        endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
      } else if (currentPageState >= totalPages - 2) {
        startPage = Math.max(2, totalPages - (maxVisiblePages - 2));
      }

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={cn(classname)}>
      <p className="mb-4 text-center">
        {totalRows > 0 ? (
          <>
            Showing{" "}
            <span className="font-medium">
              {startRow} - {currentRowsDisplay}
            </span>{" "}
            of <span className="font-medium">{totalRows}</span> results
          </>
        ) : (
          <>
            Showing <span className="font-medium">0</span> results
          </>
        )}
      </p>
      {totalPages > 0 && (
        <div className={cn(`flex items-center justify-center gap-4`)}>
          <Button
            variant="outline"
            className="border-neutral-200 px-1.5 hover:border-neutral-300"
            size="sm"
            onClick={() => handlePageChange(currentPageState - 1)}
            disabled={currentPageState === 1}
          >
            <Icon
              name="chevron"
              iconType="stroke"
              color="var(--neutral-400)"
              className="rotate-90 border-neutral-200 hover:border-neutral-300"
              size={18}
            />
          </Button>
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              typeof page === "string" ? (
                <div key={`${page}-${index}`} className="px-3 py-2">
                  <p className="text-neutral-300">...</p>
                </div>
              ) : (
                <div
                  key={index}
                  className={`fall size-8 cursor-pointer rounded-md border border-neutral-200 transition-all hover:border-neutral-300 ${
                    currentPageState === page ? "bg-neutral-500 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  <p>{page}</p>
                </div>
              ),
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-neutral-200 px-1.5 hover:border-neutral-300"
            onClick={() => handlePageChange(currentPageState + 1)}
            disabled={currentPageState === totalPages}
          >
            <Icon
              name="chevron"
              iconType="stroke"
              className="-rotate-90 border-neutral-200 hover:border-neutral-300"
              color="var(--neutral-400)"
              size={18}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
