import { useQuery } from "@tanstack/react-query";
import { BaseApiResponse } from "types/baseApiTypes";

const BASE_CURRENCY = "GBP";

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_unix: number;
}

const URL = "/common/currency/exchange-rates";

export const fetchExchangeRates = async (): Promise<ExchangeRateResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL + URL}?base_currency=${BASE_CURRENCY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const output: BaseApiResponse<ExchangeRateResponse> = await response.json();

  return output.data;
};

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 10, //10 minutes
  });
};
