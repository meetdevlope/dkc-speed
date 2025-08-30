import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import { ROUTES } from "utils/routes";
import { getOrderHistory } from "./action";
import OrderHistoryCard from "./components/OrderHistoryCard";
import OrderHistoryTable from "./components/OrderHistoryTable";
import { OrderHistory } from "./orderHistory.types";
import NoData from "components/NoData";
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
);

const OrderHistoryScreen = async () => {
  const orderHistoryData: OrderHistory[] = await getOrderHistory();

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Order History</PageHeader>
      <div className="block bg-neutral-50 px-2 py-4 md:hidden">
        {Array.isArray(orderHistoryData) && orderHistoryData.length > 0 ? (
          <div className="flex flex-col gap-y-3 bg-neutral-50">
            {orderHistoryData?.map((item, index) => (
              <OrderHistoryCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div>
            <NoData
              title="No orders placed yet"
              iconClassName="max-w-[150px]"
            />
          </div>
        )}
      </div>
      <div className="hidden p-4 md:block">
        <OrderHistoryTable orderHistoryData={orderHistoryData} />
      </div>
      <TrustBadges />
    </div>
  );
};

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
  {
    label: "Order History",
    href: ROUTES.ACCOUNT.ORDER_HISTORY,
  },
];

export default OrderHistoryScreen;
