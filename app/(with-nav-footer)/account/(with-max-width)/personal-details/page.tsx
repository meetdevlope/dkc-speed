import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Divider from "components/Divider";
import { ImageComponent } from "components/image-component/ImageComponent";
import Initials from "components/Initials";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import { UserWithTotalCartItems } from "types/user.types";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { getUser } from "utils/getUser";
import { ROUTES } from "utils/routes";
import EditPersonalDetails from "./components/EditPersonalDetails";
import SavedAddresses from "./components/SavedAddresses";
const TrustBadges = dynamic(
  () => import("../../../shop/components/TrustBadges"),
);

const PersonalDetailsScreen = async () => {
  const token = getToken() || "";
  const deviceId = getDeviceId() || "";
  const userData: UserWithTotalCartItems = await getUser(token, deviceId);
  const { user } = userData;

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Personal Details</PageHeader>
      <div className="flex w-full max-w-xl items-center gap-4 px-4 py-6">
        {user?.profile ? (
          <ImageComponent
            src={user?.profile}
            alt={user?.firstName + "-alt"}
            width={64}
            height={64}
            className="max-h-16 min-h-16 max-w-16 min-w-16 rounded-full object-cover"
          />
        ) : (
          <Initials
            name={user?.firstName?.[0]}
            className="size-16 min-w-16 text-xl"
          />
        )}
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h6 className="font-medium md:text-base">
              {user?.firstName} {user?.lastName}
            </h6>
            <EditPersonalDetails userData={user} token={token} />
          </div>
          <h6 className="mt-1">{user?.email}</h6>
          <h6 className="mt-1">
            {" "}
            {user?.countryCode} {user?.phoneNumber}
          </h6>
        </div>
      </div>
      {/* <div className="max-w-xl px-4">
        <div className="mt-4 flex items-center gap-x-2 rounded-lg border border-neutral-100 p-3">
          <Icon
            name="rotate"
            size={18}
            color="var(--neutral-400)"
            iconType="stroke"
            className="stroke-[1.4px]"
          />
          <h6 className="mr-auto font-medium">Reset Password</h6>
          <Icon
            name="chevron"
            size={20}
            color="var(--neutral-400)"
            iconType="stroke"
            className="-rotate-90"
          />
        </div>
      </div> */}
      <Divider isBlueDivider className="my-4" />
      <div className="max-w-xl">
        <SavedAddresses token={token} />
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
    label: "Personal Details",
    href: "",
  },
];

export default PersonalDetailsScreen;
