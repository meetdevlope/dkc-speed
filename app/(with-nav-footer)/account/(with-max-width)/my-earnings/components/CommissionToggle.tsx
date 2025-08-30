"use client";

import { useMutation } from "@tanstack/react-query";
import ToggleButton, { ToggleButtonType } from "components/ToggleButton";
import { CustomerCommission } from "enums/customerCommission.enum";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/auth";
import { changeCommissionType } from "../action";
import toast from "react-hot-toast";
import Icon from "components/icon/Icon";
import Tooltip from "components/tooltip/Tooltip";

interface CommissionToggleProps {
  token: string;
}

const CommissionToggle: React.FC<CommissionToggleProps> = (props) => {
  const { token } = props;

  const [commissionType, setCommissionType] = useState<CustomerCommission>(
    CustomerCommission.CREDIT,
  );
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync } = useMutation({
    mutationFn: (type: CustomerCommission) => changeCommissionType(token, type),
    onSuccess: (data) => {
      if (data) {
        toast.success("Commission type changed successfully");
      }
    },
    onError: (error) => {
      console.error("Error changing commission type:", error);
    },
  });

  const handleToggleChange = (option: CustomerCommission) => {
    try {
      mutateAsync(option);
    } catch (error) {
      console.error("Error changing commission type:", error);
    }
  };

  const user = useAuthStore((state) => state?.user?.user);

  useEffect(() => {
    if (user) {
      const userCommission = user?.commissionType as
        | CustomerCommission
        | undefined;
      setCommissionType(userCommission ?? CustomerCommission.CREDIT);
      setIsLoading(false);
    }
  }, [user, user?.commissionType]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-x-2">
        <h6>Current choice for commission</h6>
        <Tooltip
          content="The mode of payment you want to opt in"
          maxWidth={300}
        >
          <Icon
            name="info"
            iconType="stroke"
            size={18}
            className="text-neutral-400"
          />
        </Tooltip>
      </div>
      {isLoading ? (
        <div className="shimmer-loading h-[46px] w-[184px]"></div>
      ) : (
        <ToggleButton
          options={cashModeOptions}
          onSelectionChange={handleToggleChange}
          className="col-span-2 w-full md:max-w-md"
          initialSelected={commissionType}
        />
      )}
    </div>
  );
};

const cashModeOptions: ToggleButtonType[] = [
  {
    key: "credit",
    value: "Credit Points",
  },
  {
    key: "cash",
    value: "Cash",
  },
];

export default CommissionToggle;
