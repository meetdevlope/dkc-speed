import { ShipmentOptionsResponse } from "types/cart.types";
import { fetchData } from "utils/apiCaller";

export const getShipmentOptions = async (
  token: string,
  countryIso: string,
): Promise<ShipmentOptionsResponse[]> => {
  return fetchData<ShipmentOptionsResponse[]>(
    `/cart/shipment-options?region=${countryIso}`,
    {
      token: token,
      errorMessage: "shipment-options",
    },
  );
};
