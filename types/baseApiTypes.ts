export interface BaseApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
  cancelled?: boolean;
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  totalRows: number;
  currentRows: number;
}

export interface BaseApiErrorResponse {
  message?: string;
}
