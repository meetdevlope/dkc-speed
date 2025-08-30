import { BaseApiResponse, PaginatedResponse } from "types/baseApiTypes";

type Options = {
  token?: string;
  withoutToken?: boolean;
  errorMessage?: string;
  shouldNotThrowErrorOnCatch?: boolean;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};

export const fetchData = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  const {
    errorMessage = "",
    token,
    withoutToken,
    shouldNotThrowErrorOnCatch,
    next,
    cache,
  } = options;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL + url}`, {
      method: "GET",
      headers: {
        Authorization: withoutToken || !token ? "" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(cache && {
        cache,
      }),
      ...(next && {
        next,
      }),
    });
    const output: BaseApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(output?.message);
    }
    return output?.data;
  } catch (error) {
    console.log(error, `Catch: Error while Get ${errorMessage || ""}`);
    if (shouldNotThrowErrorOnCatch) {
      console.warn(`Suppressed Catch Error: Failed Get ${errorMessage}`);
      return null as T;
    }
    throw new Error(`${error || errorMessage}`);
  }
};

export const fetchDataPagination = async <T>(
  url: string,
  options: Options,
): Promise<PaginatedResponse<T>> => {
  const {
    errorMessage = "",
    token,
    withoutToken,
    next,
    shouldNotThrowErrorOnCatch,
  } = options;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL + url}`, {
      method: "GET",
      headers: {
        Authorization: withoutToken ? "" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(next && {
        next,
      }),
    });
    const output: BaseApiResponse<PaginatedResponse<T>> = await response.json();

    if (!response.ok) {
      if (shouldNotThrowErrorOnCatch) {
        console.warn(`Suppressed Catch Error: Failed Get ${errorMessage}`);
        return {
          data: [],
          meta: {
            currentPage: 1,
            currentRows: 1,
            totalPages: 0,
            totalRows: 0,
          },
        };
      }
      throw new Error(output?.message);
    }

    return output?.data;
  } catch (error) {
    console.log(error, `Catch: Error while Get ${errorMessage || ""}`);
    throw new Error(`${errorMessage} - ${error}`);
  }
};
