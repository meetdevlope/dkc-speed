import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getMyPreOrders } from "./action";
import MyPreOrdersTable from "./components/MyPreOrdersTable";
import NoData from "components/NoData";
import MyPreOrderCard from "./components/MyPreOrderCard";

const MyPreOrdersScreen = async () => {
  const token = getToken();

  const myPreOrders = await getMyPreOrders(token || "");

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>My Pre-Orders</PageHeader>
      <div className="block bg-neutral-50 px-2 py-4 md:hidden">
        {Array.isArray(myPreOrders) && myPreOrders.length > 0 ? (
          <div className="flex flex-col gap-y-3 bg-neutral-50">
            {myPreOrders?.map((item, index) => (
              <MyPreOrderCard key={index} {...item} />
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
        <MyPreOrdersTable myPreOrdersData={myPreOrders} />
      </div>
    </div>
  );
};

export default MyPreOrdersScreen;

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
];
