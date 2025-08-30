import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getMyRentals } from "./action";
import MyRentalsTable from "./components/MyRentalsTable";
import RentalCard from "./components/RentalCard";
// import NoData from "components/NoData";
const NoData = dynamic(() => import("components/NoData"), { ssr: false });
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
  { ssr: false },
);

const MyRentalsScreen = async () => {
  const token = getToken();
  const myRentals = await getMyRentals(token || "");

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>My Rentals</PageHeader>
      <div className="block bg-neutral-50 px-2 py-4 md:hidden">
        {Array.isArray(myRentals) && myRentals.length > 0 ? (
          <div className="flex flex-col gap-y-4 bg-neutral-50">
            {myRentals?.map((item, index) => (
              <RentalCard key={index} {...item} />
            ))}
          </div>
        ) : (
          <div>
            <NoData
              title="No products rented yet"
              iconClassName="max-w-[150px]"
            />
          </div>
        )}
      </div>
      <div className="hidden p-4 md:block">
        <MyRentalsTable myRentalsData={myRentals} />
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
    label: "My Rentals",
    href: ROUTES.ACCOUNT.MY_RENTALS,
  },
];

export default MyRentalsScreen;
