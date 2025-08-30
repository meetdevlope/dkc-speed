import React from "react";
import { Address } from "types/address.types";

const SavedAddressCard: React.FC<Address> = (props) => {
  const {
    area,
    city,
    country,
    line1,
    line2,
    personName,
    state,
    zipCode,
    lat,
    long,
  } = props;

  return (
    <div className={`rounded-md border border-neutral-100 p-4`}>
      <div className="flex gap-2">
        <h5 className="text-base font-semibold text-gray-700 capitalize">
          {personName}
        </h5>
      </div>

      <div className="mt-2 flex flex-col gap-y-0.5 text-sm text-gray-700">
        <h6>
          {line1}, {line2}
        </h6>
        <h6>
          {area}, {city}, {state}
        </h6>
        <h6>
          {zipCode}, {country}
        </h6>
      </div>

      {lat !== 0 && long !== 0 && (
        <div className="mt-2 text-xs text-gray-500">
          <h6>
            Coordinates: {lat}, {long}
          </h6>
        </div>
      )}
    </div>
  );
};

export default SavedAddressCard;
