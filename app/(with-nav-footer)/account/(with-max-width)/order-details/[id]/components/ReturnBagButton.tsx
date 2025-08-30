import { Button } from "components/Button";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";

type ReturnBagButtonProps = {
  sku: string;
};

const ReturnBagButton: React.FC<ReturnBagButtonProps> = (props) => {
  const { sku } = props;

  return (
    <Link href={ROUTES.ACCOUNT.VERIFY_BAG_RETURN(sku)} className="w-full">
      <Button size="sm" variant="outline" className="w-full">
        Return bag
      </Button>
    </Link>
  );
};

export default ReturnBagButton;
