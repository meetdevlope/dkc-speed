"use client";

import CustomSelect, { CustomSelectProps } from "components/Select";
import React from "react";
import { wearTypeMapper } from "utils/mappers";

interface WearTypeDropdownProps extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
}

const WearTypeDropdown: React.FC<WearTypeDropdownProps> = (props) => {
  const { ...rest } = props;

  const wearTypeOptions = Object.entries(wearTypeMapper).map(
    ([value, label]) => ({
      label,
      value,
    }),
  );

  return <CustomSelect label="Wear Type" options={wearTypeOptions} {...rest} />;
};

export default WearTypeDropdown;
