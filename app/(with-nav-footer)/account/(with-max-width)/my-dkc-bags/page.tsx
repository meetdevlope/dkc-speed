import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import { ROUTES } from "utils/routes";
import { getMyDKCBags } from "./action";
import MyDKCBagCard from "./components/MyDKCBagCard";
import MyDKCBagsTable from "./components/MyDKCBagsTable";
import NoData from "components/NoData";
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
);
const MyDKCBagsScreen = async () => {
  const myDKCBagsData = await getMyDKCBags();

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>My DKC Bags</PageHeader>
      <div className="block bg-neutral-50 px-2 py-4 md:hidden">
        {Array.isArray(myDKCBagsData) && myDKCBagsData.length > 0 ? (
          <div className="flex flex-col gap-2 bg-neutral-50">
            {myDKCBagsData?.map((item, index) => (
              <MyDKCBagCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div>
            <NoData title="No bags ordered yet" iconClassName="max-w-[150px]" />
          </div>
        )}
      </div>
      <div className="hidden p-4 md:block">
        <MyDKCBagsTable myDKCBagsData={myDKCBagsData} />
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
    label: "My DKC Bags",
    href: ROUTES.ACCOUNT.My_DKC_BAGS,
  },
];

export default MyDKCBagsScreen;
