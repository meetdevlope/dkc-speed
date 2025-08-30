import Divider from "components/Divider";
import ListItem from "components/ListItem";
import { useCartStore } from "store/cart";
import CartUtils, { ExtraChargesModel } from "utils/cartTotal";
import { RentUtils } from "utils/rent";
import TotalDeposit from "./TotalDeposit";
import Icon from "components/icon/Icon";
import { useCheckoutStore } from "store/checkout";
import { useGetTaxAndCharges } from "hooks/queries/useGetTaxAndCharges";

type CartTotalProps = {
  isLoading?: boolean;
  isError?: string;
};

export const totalDepositKey = "Total Deposit";

const CartTotal: React.FC<CartTotalProps> = () => {
  const { data: cartData, myDiscounts } = useCartStore();
  const {
    data: taxAndExtraCharges,
    isLoading,
    isError,
  } = useGetTaxAndCharges();

  const extraCharges: ExtraChargesModel[] =
    taxAndExtraCharges?.map((item) => ({
      label: item.key,
      amount: item.value,
      isPercentage: item.valueType === "percentage",
    })) ?? [];

  extraCharges.push({
    label: totalDepositKey,
    amount: RentUtils.getTotalDeposit(cartData),
    isPercentage: false,
  });

  const shipmentCharges = useCheckoutStore().shipment?.cost;

  const cartTotal = CartUtils.getCharges(
    cartData,
    extraCharges,
    myDiscounts,
    shipmentCharges || 0,
  );

  const { paymentDestructure, total } = cartTotal;

  if (isLoading) {
    return (
      <div className="flex h-[210px] w-full flex-col gap-y-2 rounded-lg">
        {Array(5)
          .fill(null)
          .map((item) => (
            <div key={item} className="shimmer-loading h-6 w-full rounded-md" />
          ))}
        <div className="shimmer-loading mt-auto h-8 w-full rounded-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fall h-[210px] w-full flex-col rounded-lg bg-blue-light">
        <Icon
          name="sad"
          size={62}
          iconType="stroke"
          color="var(--neutral-200)"
        />
        <h6 className="mt-1 text-neutral-300">
          {isError || "Something went wrong"}
        </h6>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-0.5">
      {isLoading && "loading"}
      {Object.keys(paymentDestructure || {})
        .filter((e) => e !== totalDepositKey)
        .map((key) => (
          <ListItem
            label={key}
            value={paymentDestructure[key]}
            isCurrency
            key={key}
          />
        ))}
      <TotalDeposit cartResponse={cartData} label={totalDepositKey} />
      <Divider className="my-3 bg-neutral-200" />
      <ListItem label="Total" value={total} isBold isCurrency />
    </div>
  );
};

export default CartTotal;
