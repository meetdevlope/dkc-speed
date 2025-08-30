import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getMyItems } from "./action";
import MyItemCard from "./components/MyItemsCard";
import MyItemsTable from "./components/MyItemsTable";
import NoData from "components/NoData";
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
);

const MyItemsScreen = async () => {
  const token = getToken();

  const myItems = await getMyItems(token || "");

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>My Items</PageHeader>
      <div className="block bg-neutral-50 px-2 py-4 md:hidden">
        {Array.isArray(myItems?.data) && myItems?.data.length > 0 ? (
          <div className="flex flex-col gap-2 bg-neutral-50">
            {myItems?.data?.map((item, index) => (
              <MyItemCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div>
            <NoData title="No items sent yet" iconClassName="max-w-[150px]" />
          </div>
        )}
      </div>
      <div className="hidden p-4 md:block">
        <MyItemsTable myItemsData={myItems} />
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
    label: "My Items",
    href: "",
  },
];

export default MyItemsScreen;
