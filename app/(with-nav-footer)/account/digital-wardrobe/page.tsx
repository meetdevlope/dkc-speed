import { getEnvironmentalFootprint } from "app/(with-nav-footer)/products/[slug]/action";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import Link from "next/link";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getWardrobeItems } from "./action";
import DigitalWardrobeCards from "./components/DigitalWardrobeCards";
import EventsJournaling from "./components/event/EventsJournaling";
import FamilyMembers from "./components/family/FamilyMembers";
import WardrobeItems from "./components/wardrobe-items/WardrobeItemList";
import WardrobeSlider from "./components/wardrobe-items/WardrobeSlider";
import FamilyMemberDetailFootprint from "./family-member/[id]/components/FamilyMemberDetailFootprint";
import { Suspense } from "react";
import RecommendationSkeleton from "./components/RecommendationSkeleton";
import RecommendedProducts from "./components/RecommendedProducts";

const DigitalWardrobePage = async (params) => {
  const { searchParams } = params;
  const { search, collection } = searchParams;

  const token = getToken();

  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "20");
  if (search) {
    queryParams.append("search", search || "");
  }
  if (collection) {
    queryParams.append("collection", collection || "");
  }

  const wardrobeItems = await getWardrobeItems(
    token || "",
    queryParams?.toString(),
  );
  const data = await getEnvironmentalFootprint(
    token || "",
    EnvironmentalFootprintTypes.USER,
  );

  return (
    <div>
      <MaxWidthWrapper>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageHeader>Digital Wardrobe</PageHeader>
        <DigitalWardrobeCards />
        <div className="px-4">
          <FamilyMemberDetailFootprint data={data} />
          <div className="p-4 pt-0">
            <h6 className="mt-1 text-gray-500">
              *Environmental impact data is calculated using DKC’s ReLuxe
              Impact™ method.{" "}
              <Link
                href={"/sustainability-commitment"}
                className="text-blue-500 underline"
              >
                Learn more
              </Link>
            </h6>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="my-14">
        {" "}
        <WardrobeSlider />
      </div>
      <MaxWidthWrapper>
        <WardrobeItems data={wardrobeItems} />
      </MaxWidthWrapper>
      <FamilyMembers token={token || ""} />
      <EventsJournaling />
      <Suspense fallback={<RecommendationSkeleton />}>
        <RecommendedProducts />
      </Suspense>
      <MaxWidthWrapper className="mb-8">
        <div className="flex w-full flex-col items-center gap-y-6 bg-primary-500 px-4 py-8 md:px-8 md:py-12">
          <h3 className="text-center text-white uppercase">
            Discover More Sustainable Magic
          </h3>
          <p className="text-center text-neutral-200">
            Explore our full collection of pre-loved designer pieces and give
            fashion a second life while saving the planet, one outfit at a time.
          </p>
          <Link
            href={ROUTES.COLLECTION.ROOT}
            className="border-t border-t-white pt-1 text-sm text-white"
          >
            BROWSE ALL COLLECTION
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default DigitalWardrobePage;

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
