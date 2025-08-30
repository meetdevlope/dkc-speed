import { EnvironmentalFootprintResponse } from "app/(with-nav-footer)/products/[slug]/action";
import React from "react";
import MemberEnvironmentalFootprint from "../../../components/MemberEnvironmentalFootprint";

interface FamilyMemberDetailFootprintProps {
  data: EnvironmentalFootprintResponse;
}

const FamilyMemberDetailFootprint: React.FC<
  FamilyMemberDetailFootprintProps
> = (props) => {
  const { data } = props;

  return (
    <div className="my-6 rounded-md bg-blue-light p-4">
      <h6 className="mb-2 font-medium">Environmental Footprint</h6>
      <MemberEnvironmentalFootprint data={data} />
    </div>
  );
};

export default FamilyMemberDetailFootprint;
