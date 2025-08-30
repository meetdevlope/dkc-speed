import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import dayjs from "dayjs";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import DeleteMember from "./components/DeleteMember";
import EditMember from "./components/EditMember";
import Divider from "components/Divider";
import FamilyMemberCards from "./components/FamilyMemberCards";
import FamilyMemberDetailFootprint from "./components/FamilyMemberDetailFootprint";
import FamilyMemberWardrobeItems from "./components/FamilyMemberWardrobeItems";
import FamilyMemberEvents from "./components/FamilyMemberEvents";
import { getFamilyMemberDetails } from "./actions";

const FamilyMemberDetailsScreen = async (props) => {
  const token = getToken();
  const id = props?.params?.id;

  const { member, overview, environmentFootprint } =
    (await getFamilyMemberDetails(token || "", id)) || {};

  const age = dayjs().diff(member?.birthDate, "year");

  return (
    <div>
      <MaxWidthWrapper>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageHeader>{member?.name && member?.name + `'s`} Wardrobe</PageHeader>
        <div className="my-6 flex w-full items-center gap-x-5 p-4">
          <div className="fall size-16 shrink-0 rounded-full bg-neutral-500">
            <h6 className="text-white"> {member?.name?.[0] || "-"} </h6>
          </div>
          <div className="mr-auto w-full">
            <h5 className="font-medium text-primary-500">{member?.name}</h5>
            <div className="flex w-full items-center justify-between">
              <p className="text-neutral-500">
                {age} years old -{" "}
                <span className="capitalize">{member?.gender}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-y-1">
            <EditMember member={member} token={token || ""} />
            <DeleteMember member={member} token={token || ""} />
          </div>
        </div>
      </MaxWidthWrapper>
      <Divider isBlueDivider />
      <MaxWidthWrapper className="my-8">
        <FamilyMemberCards overview={overview} />
        <FamilyMemberDetailFootprint data={environmentFootprint} />
        <FamilyMemberWardrobeItems memberId={id} />
        <FamilyMemberEvents memberId={id} />
      </MaxWidthWrapper>
    </div>
  );
};

export default FamilyMemberDetailsScreen;

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
    label: "Digital Wardrobe",
    href: ROUTES.ACCOUNT.DIGITAL_WARDROBE.ROOT,
  },
];
