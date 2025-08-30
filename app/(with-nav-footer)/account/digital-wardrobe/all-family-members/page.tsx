import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import Link from "next/link";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getFamilyMembers } from "../action";
import AddFamilyMember from "../components/family/AddFamilyMember";
import WardrobeMemberCard from "../components/wardrobe-items/WardrobeMemberCard";
import { Button } from "components/Button";
import Icon from "components/icon/Icon";

const AllFamilyMembersScreen = async () => {
  const token = getToken();
  const familyMembers = await getFamilyMembers(token || "");

  return (
    <div>
      <MaxWidthWrapper className="bg-blue-light md:bg-white">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageHeader
          endElement={
            <AddFamilyMember token={token || ""}>
              <Button
                size="sm"
                startIcon={
                  <Icon
                    name="plus"
                    className={"stroke-[1.5px] text-white"}
                    iconType="stroke"
                  />
                }
                variant="outline"
                className={"bg-primary-500 text-white hover:bg-primary-600"}
              >
                Add member
              </Button>
            </AddFamilyMember>
          }
        >
          Family Members
        </PageHeader>
      </MaxWidthWrapper>
      <div className="bg-blue-light">
        <MaxWidthWrapper>
          <div className="my-6 grid grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 md:py-10 lg:grid-cols-3 lg:py-12">
            {Array.isArray(familyMembers) &&
              familyMembers?.length > 0 &&
              familyMembers?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 shadow-xs"
                >
                  <WardrobeMemberCard data={item} />
                </div>
              ))}
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div className="p-4 pt-0">
          <h6 className="mt-1 text-gray-500">
            *Environmental impact data is calculated using DKC’s ReLuxe Impact™
            method.{" "}
            <Link
              href={"/sustainability-commitment"}
              className="text-blue-500 underline"
            >
              Learn more
            </Link>
          </h6>
        </div>
        {(!familyMembers ||
          !Array.isArray(familyMembers) ||
          familyMembers?.length < 1) && (
          <h6 className="text-center text-white">
            No family members added yet. Please click on Add member to create
            one
          </h6>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default AllFamilyMembersScreen;

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
  {
    label: "Family Members",
    href: ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_FAMILY_MEMBERS,
  },
];
