import { EnvironmentalFootprintData } from "app/(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint";
import { IconName } from "components/icon/Icons";
import React from "react";

export type ImpactCardProps = {
  icon: IconName;
  label: string;
  impact: string;
  description: string;
};

const ImpactCard: React.FC<EnvironmentalFootprintData> = (props) => {
  const { icon: Icon, title, value, suffix } = props;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-100">
      <div className="flex justify-center bg-dune p-4">
        <div className="rounded-full bg-primary-light p-2">
          <Icon />
        </div>
      </div>
      <div className="p-3 text-center">
        <h5 className="font-semibold text-primary-500">
          {value} {suffix || ""}
        </h5>
        <h6 className="my-1 mb-2 text-neutral-500">{title}</h6>
        {/* <p className="text-neutral-400 lg:mt-4">{description}</p> */}
      </div>
    </div>
  );
};

export default ImpactCard;
