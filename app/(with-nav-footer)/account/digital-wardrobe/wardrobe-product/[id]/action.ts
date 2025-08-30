import { fetchData } from "utils/apiCaller";
import { WardrobeItem } from "../../action";

export const getWardrobeProductDetails = async (
  token: string,
  id: string,
): Promise<WardrobeItem> => {
  return fetchData<WardrobeItem>(`/wardrobe/inventory/details/${id}`, {
    token: token,
    errorMessage: "journal-list",
    shouldNotThrowErrorOnCatch: true,
  });
};
