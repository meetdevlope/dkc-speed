import { City, Country, State } from "types/address.types";

export const useCityStateCountry = () => {
  const BASE_API = "https://api.countrystatecity.in/v1";

  const getCountries = async (): Promise<Country[] | null> => {
    try {
      const res = await fetch(`${BASE_API}/countries`, {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_CSC_API_KEY as string,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch all countries");
      }

      const response: Country[] = await res.json();

      return response;
    } catch (error) {
      console.log(error, "Error while fetching countries");
      return null;
    }
  };

  const getStates = async (countryIso: string): Promise<State[] | null> => {
    try {
      const res = await fetch(`${BASE_API}/countries/${countryIso}/states`, {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_CSC_API_KEY as string,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch all states by country");
      }

      const response: State[] = await res.json();

      return response;
    } catch (error) {
      console.log(error, "Error while fetching states by country");
      return null;
    }
  };

  const getCities = async (
    countryIso: string,
    stateIso: string,
  ): Promise<City[] | null> => {
    try {
      const res = await fetch(
        `${BASE_API}/countries/${countryIso}/states/${stateIso}/cities`,
        {
          method: "GET",
          headers: {
            "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_CSC_API_KEY as string,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch all cities by country and state");
      }

      const response: City[] = await res.json();

      return response;
    } catch (error) {
      console.log(error, "Error while fetching states by country and state");
      return null;
    }
  };

  return {
    getCountries,
    getStates,
    getCities,
  };
};
