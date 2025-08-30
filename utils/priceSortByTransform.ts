const sortBy = "sortBy";

export const priceSortByTransform = (
  urlParams: string,
  dbField?: string,
): string => {
  const searchParams = urlParams
    ? new URLSearchParams(urlParams)
    : new URLSearchParams();

  const sortByValue = searchParams.get(sortBy);
  const newDbField = dbField || "sellingPrice";

  if (sortByValue) {
    searchParams.delete(sortBy);

    switch (sortByValue) {
      case "PRICE_HIGH_TO_LOW":
        searchParams.set("dbField", newDbField);
        searchParams.set("isAscending", "false");
        break;

      case "PRICE_LOW_TO_HIGH":
        searchParams.set("dbField", newDbField);
        searchParams.set("isAscending", "true");
        break;
    }
  }

  return searchParams.toString();
};
