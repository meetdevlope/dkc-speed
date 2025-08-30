import React, { useMemo } from "react";

export type Pagination = {
  currentRows: number;
  totalRows: number;
  currentPage: number;
};

export type PaginationProps = Pagination & {
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    currentPage,
    currentRows,
    onPageChange,
    totalRows,
    totalPages,
    isLoading,
  } = props;

  // Create an array for page numbers to display
  let pageNumbers: (number | string)[] = [];

  if (totalPages <= 7) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pageNumbers = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }

  const showingItems = useMemo(() => {
    if (currentRows > 0) {
      return (
        <>
          Showing {(currentPage - 1) * currentRows + 1} to{" "}
          {Math.min(currentPage * currentRows, totalRows)} of {totalRows} items
        </>
      );
    } else {
      return "No items found";
    }
  }, [currentPage, currentRows, totalRows]);

  if (isLoading) {
    return (
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="w-32 h-6 rounded bg-disable-200" />
        <div className="w-48 h-6 rounded bg-disable-200" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-xl">
      <div className="text-sm text-gray-700">{showingItems}</div>
      {currentRows > 0 && (
        <div className="flex space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-1 py-1 text-sm border border-disable-500 text-disable-600 rounded-md disabled:opacity-30 disabled:cursor-not-allowed mr-1 cursor-pointer hover:bg-disable-100"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === "number" ? (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span className="px-3 py-1 text-sm text-gray-700">...</span>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-1 py-1 border border-disable-500 text-disable-600 text-sm rounded-md disabled:opacity-30 disabled:cursor-not-allowed ml-1 cursor-pointer hover:bg-disable-100"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export const defaultPagination: PaginationProps = {
  currentPage: 1,
  currentRows: 10,
  onPageChange: () => {},
  totalRows: 0,
  totalPages: 0,
};

export default Pagination;
