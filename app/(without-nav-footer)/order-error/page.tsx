import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { Icons } from "components/Icons";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const OrderError = () => {
  return (
    <div className="mx-auto flex h-[90vh] max-w-lg flex-col px-4">
      <div className="fall h-full flex-col gap-4">
        <Icons.error />
        <h2 className="mt-6">Oops!</h2>
        <h6>There was an error while creating the order.</h6>
      </div>
      <h6 className="text-description mt-auto pb-6 text-center">
        Need help?{" "}
        <Link
          className="font-secondary font-semibold text-black underline"
          href={ROUTES.CONTACT_US}
        >
          Contact our support team!
        </Link>
      </h6>
      <Link href={ROUTES.SHOP} className="justify-end">
        <Button
          className="w-full"
          endIcon={
            <Icon
              name="chevron"
              color="var(--neutral-400)"
              iconType="stroke"
              className="-rotate-90"
              size={22}
            />
          }
        >
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default OrderError;
