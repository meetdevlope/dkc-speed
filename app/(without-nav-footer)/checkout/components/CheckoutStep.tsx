import React from "react";

type CheckoutStepProps = {
  stepCount: number;
  title: string;
  isCurrentStep: boolean;
  onStepClick?: () => void;
};

const CheckoutStep: React.FC<CheckoutStepProps> = (props) => {
  const { stepCount, title, isCurrentStep, onStepClick } = props;

  return (
    <div className="flex flex-col items-center gap-2" onClick={onStepClick}>
      <span
        className={`fall size-7 rounded-full text-xs font-medium md:size-8 ${isCurrentStep ? "bg-secondary/60" : "bg-gray-50 text-primary1/60"}`}
      >
        {stepCount}
      </span>
      <p
        className={`${isCurrentStep ? "font-medium text-primary1" : "text-primary1/60"}`}
      >
        {title}
      </p>
    </div>
  );
};

export default CheckoutStep;
