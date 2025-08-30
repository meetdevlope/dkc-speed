import React from "react";

type InfoDisplayProps = {
  label: string;
  value: string;
};

const InfoDisplay: React.FC<InfoDisplayProps> = (props) => {
  const { label, value } = props;

  return (
    <div className="flex flex-col gap-1">
      <h6 className="font-semibold"> {label} </h6>
      <h5> {value} </h5>
    </div>
  );
};

export default InfoDisplay;
