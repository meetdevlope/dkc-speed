import { EnvironmentalFootprintResponse } from "app/(with-nav-footer)/products/[slug]/action";
import {
  CarbonEmissionIcon,
  EnergyIcon,
  EnvironmentalFootprintData,
  FreshWaterIcon,
  WaterSavedIcon,
} from "app/(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint";
import React from "react";

interface MemberEnvironmentalFootprintProps {
  data: EnvironmentalFootprintResponse;
}

const MemberEnvironmentalFootprint: React.FC<
  MemberEnvironmentalFootprintProps
> = (props) => {
  const { data } = props;

  const newData: EnvironmentalFootprintData[] = [
    {
      title: "Carbon emission saved",
      value: data?.co2e_footprint_kg || 0,
      icon: CarbonEmissionIcon,
      suffix: "kg CO2",
    },
    {
      title: "Energy saved",
      value: data?.cumulative_energy_demand_mj || 0,
      icon: EnergyIcon,
      suffix: "MJ",
    },
    {
      title: "Water saved",
      value: data?.eutrophication_footprint_m3 || 0,
      icon: WaterSavedIcon,
      suffix: "m3",
    },
    {
      title: "Freshwater nutrient pollution saved",
      value: data?.water_scarcity_footprint_g_peq || 0,
      icon: FreshWaterIcon,
      suffix: "kg P - Eq",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {newData?.map((item, index) => (
        <div className="flex items-start gap-x-3" key={index}>
          <item.icon />
          <div className="flex flex-col items-start gap-y-1">
            <h5 className="font-medium">
              {" "}
              {item?.value?.toFixed(2)} {item?.suffix}
            </h5>
            <p className="text-left text-neutral-400"> {item?.title} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberEnvironmentalFootprint;
