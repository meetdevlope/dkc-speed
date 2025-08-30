"use client";

import { useEffect, useState } from "react";
import { useLocalizationStore } from "store/localizationStore";
import toast from "react-hot-toast";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeocodingResult {
  status: string;
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
  }>;
}

const NOT_SUPPORTED = "Geolocation is not supported by your browser";
const apiKey = process.env.NEXT_PUBLIC_MAPS_KEY;

export function useUserGeolocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const { setCountry, country } = useLocalizationStore();

  useEffect(() => {
    if (country.value) {
      setLoading(false);
      return;
    }
    let isMounted = true;

    const getGeolocation = () => {
      if (!navigator.geolocation) {
        if (isMounted) {
          toast.error(NOT_SUPPORTED);
          setError(NOT_SUPPORTED);
          setLoading(false);
        }
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (isMounted) {
            setLocation({ latitude, longitude });
          }

          //   Australia coordiantes
          //   const latitude = 51.495999;
          //   const longitude = -0.086028;

          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
            );
            const data: GeocodingResult = await res.json();

            if (isMounted) {
              if (data.status === "OK" && data.results.length > 0) {
                const countryComponent =
                  data.results[0].address_components.find((comp) =>
                    comp.types.includes("country"),
                  );

                if (countryComponent) {
                  const iso = countryComponent.short_name;
                  setCountry({
                    label: countryComponent.long_name,
                    value: iso,
                  });
                  document.cookie = `dkc-user-country=${iso}; path=/; max-age=31536000`;
                } else {
                  setError("Country not found in geocoding results");
                }
              } else {
                setError(`Geocoding API error: ${data.status}`);
              }

              setLoading(false);
            }
          } catch (err) {
            if (isMounted) {
              setError(
                `Error: ${err instanceof Error ? err.message : String(err)}`,
              );
              setLoading(false);
            }
          }
        },
        (err) => {
          if (isMounted) {
            setError(`Location error: ${err.message}`);
            setLoading(false);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    };

    getGeolocation();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  return {
    location,
    loading,
    error,
  };
}
