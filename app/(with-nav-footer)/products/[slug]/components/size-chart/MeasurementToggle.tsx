import React, { ReactNode, SetStateAction, useEffect } from "react";

type MeasurementToggleProps = {
  measurementUnit: string;
  measurementState: string;
  setMeasurementState: React.Dispatch<SetStateAction<string>>;
};

type ToggleButtonProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

const MeasurementToggle: React.FC<MeasurementToggleProps> = (props) => {
  const {
    measurementState,
    measurementUnit: pMeasurement,
    setMeasurementState,
  } = props;

  useEffect(() => {
    if (pMeasurement) {
      setMeasurementState(pMeasurement);
    }
  }, [pMeasurement, setMeasurementState]);

  const handleToggle = (value: string) => {
    setMeasurementState(value);
  };

  if (!pMeasurement) return null;

  return (
    <div className="flex items-center gap-2">
      <p>Measurements in</p>
      <div className="rounded-full border border-gray-200">
        {["cm", "inch"].map((item, index) => (
          <ToggleButton
            key={index}
            isSelected={item === measurementState}
            onClick={() => handleToggle(item)}
          >
            {item}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { children, isSelected, onClick } = props;
  return (
    <span
      className={`inline-block cursor-pointer rounded-full px-3 py-1 text-xs font-medium ${isSelected ? "bg-primary-500 text-white" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default MeasurementToggle;
