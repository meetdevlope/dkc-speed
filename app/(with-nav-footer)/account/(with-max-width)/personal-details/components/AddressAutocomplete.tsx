"use client";

import {
  Libraries,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Input } from "components/Input";
import { useUserGeolocation } from "hooks/useUserGeolocation";
import { useCallback, useMemo, useRef } from "react";
import { useLocalizationStore } from "store/localizationStore";

export type AddressAutocompleteProps = {
  onPlaceSelect: (placeData: google.maps.GeocoderAddressComponent[]) => void;
  label?: string;
  useGeoBounding?: boolean;
  disableCountryRestrict?: boolean;
};

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = (props) => {
  const {
    onPlaceSelect,
    label,
    useGeoBounding = true,
    disableCountryRestrict = false,
  } = props;
  const { location } = useUserGeolocation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const userCountry = useLocalizationStore((state) => state.country);

  const libs: Libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY || "",
    libraries: libs,
  });

  const handleOnPlaceChange = useCallback(() => {
    if (autocompleteRef.current && inputRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.address_components) {
        onPlaceSelect(place.address_components);
      }
    }
  }, [onPlaceSelect]);

  return (
    <div>
      {isLoaded ? (
        <Autocomplete
          onLoad={(autocomplete) => {
            if (inputRef.current) {
              autocompleteRef.current = autocomplete;
            }
          }}
          onPlaceChanged={handleOnPlaceChange}
          options={{
            ...(!disableCountryRestrict && {
              componentRestrictions: {
                country: userCountry?.value || null,
              },
            }),
            ...(location &&
              useGeoBounding && {
                bounds: {
                  north: location.latitude + 0.1,
                  south: location.latitude - 0.1,
                  east: location.longitude + 0.1,
                  west: location.longitude - 0.1,
                },
              }),
          }}
        >
          <Input label={label} ref={inputRef} />
        </Autocomplete>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="shimmer-loading h-5 w-full"></div>
          <div className="shimmer-loading h-11 w-full"></div>
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
