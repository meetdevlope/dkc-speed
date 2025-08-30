import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { Icons } from "components/Icons";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const OrderSuccessful = async (props) => {
  const { searchParams } = props;
  const id = searchParams?.orderId;

  return (
    <div className="mx-auto flex h-[90vh] max-w-lg flex-col px-4">
      <div className="fall h-full flex-col gap-4">
        <div className="size-40">
          <Icons.success />
        </div>

        <h2 className="mt-6">Order created!</h2>
        <h6>Your order has been created successfully.</h6>
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
      <Link href={ROUTES.SHOP} className="justify-end" replace>
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
      <Link
        href={ROUTES.ACCOUNT.ORDER_DETAILS(id)}
        className="mt-4 justify-end"
        replace
      >
        <Button
          className="w-full"
          variant="outline"
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
          Order Details
        </Button>
      </Link>
    </div>
  );
};

export default OrderSuccessful;
