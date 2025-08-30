"use client";

import { useMutation } from "@tanstack/react-query";
import Switch from "components/Switch";
import { useEffect, useState } from "react";
import { updateRentCondition } from "../action";
import { useRouter } from "next/navigation";

interface RentSwitchProps {
  token: string;
  id: string;
  forRent: boolean;
}

const RentSwitch: React.FC<RentSwitchProps> = (props) => {
  const { id, token, forRent } = props;

  const [isChecked, setIsChecked] = useState(false);
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: () => updateRentCondition(token, id),
    onSuccess: (data) => {
      if (data) {
        route.refresh();
        setIsChecked((prev) => !prev);
      }
    },
  });

  const handleChange = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (forRent) {
      setIsChecked(forRent);
    }
  }, [forRent]);

  return (
    <Switch
      checked={isChecked}
      setChecked={handleChange}
      loading={mutation.isPending}
    />
  );
};

export default RentSwitch;
