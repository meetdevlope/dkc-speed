import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";
import { getCategory } from "app/(with-nav-footer)/category/[slug]/action";
import GalleryWrapper from "app/(with-nav-footer)/products/[slug]/components/image-gallery/GalleryWrapper";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { Button } from "components/Button";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Divider from "components/Divider";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import dayjs from "dayjs";
import { Suspense } from "react";
import { getToken } from "utils/getToken";
import { wearTypeMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import RecommendationSkeleton from "../../components/RecommendationSkeleton";
import { getFamilyMemberDetails } from "../../family-member/[id]/actions";
import { WardrobeInventoryWarnType } from "../../wardrobe.types";
import { getWardrobeProductDetails } from "./action";
import EditWardrobeItem from "./components/EditWardrobeItem";
import MatchingProducts from "./components/MatchingProducts";
import WardrobeProductDonate from "./components/WardrobeProductDonate";
import WardrobeProductEvents from "./components/WardrobeProductEvents";
import WardrobeProductRepair from "./components/WardrobeProductRepair";
import WardrobeProductResell from "./components/WardrobeProductResell";
import WardrobeProductValuationDialog from "./components/WardrobeProductValuationDialog";

const WardrobeProductScreen = async (props) => {
  const id = props?.params?.id;
  const token = getToken();

  const productData = await getWardrobeProductDetails(token || "", id);
  const {
    photos,
    purchasePrice,
    brand,
    size,
    familyMember,
    wearType,
    purchaseDate,
    _id,
    categories,
    name,
  } = productData || {};
  const brandDetails = await getBrandDetails(brand || "");
  const familyMemberDetails = await getFamilyMemberDetails(
    token || "",
    familyMember || "",
  );
  const categoryNames = await Promise.all(
    (categories || []).map(async (categoryId) => {
      const category = await getCategory(categoryId);
      return category?.name || "Unknown Category";
    }),
  );

  const optionsData: Option[] = [
    {
      label: "Family Member",
      value: familyMemberDetails?.member?.name || "",
    },
    {
      label: "Size",
      value: size,
    },
    {
      label: "Category",
      value: categoryNames?.join(", ") || "-",
    },
    {
      label: "Wear Type",
      value: wearTypeMapper[wearType as WardrobeInventoryWarnType],
    },
    {
      label: "Purchase Date",
      value: dayjs(purchaseDate).format("DD MMM YYYY"),
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between px-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} showInMobile />
      </div>
      <div className="relative flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="relative w-full max-w-4xl p-4 pt-0">
          <GalleryWrapper images={photos || []} />
        </div>
        <div className="top-8 z-0 h-fit w-full pb-4 md:sticky lg:max-w-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="border-l-2 border-l-primary-500 pl-1 font-semibold text-primary-500 uppercase">
                {brandDetails?.name || "-"}
              </p>
              <EditWardrobeItem
                token={token || ""}
                item={{
                  brand: {
                    label: brandDetails?.name,
                    value: brandDetails?._id || "",
                  },
                  familyMember: {
                    label: familyMemberDetails?.member?.name,
                    value: familyMemberDetails?.member?._id,
                  },
                  id: _id,
                  images: photos,
                  purchaseDate: purchaseDate || "",
                  purchasePrice,
                  size: {
                    label: size,
                    value: size,
                  },
                  wearType,
                }}
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-primary"> {name} </h3>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <CurrencyDisplay
                amount={purchasePrice}
                className="text-xl md:text-xl lg:text-2xl"
              />
            </div>
          </div>
          <Divider isBlueDivider />
          <div className="flex flex-col gap-y-4 p-4">
            {optionsData?.map((item, index) => (
              <div key={index} className="flex w-full flex-col">
                <h6 className="text-xs text-neutral-400 md:text-sm">
                  {item.label}
                </h6>
                <h6 className="mt-1 font-medium text-neutral-500">
                  {item?.value}
                </h6>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-4 p-4">
            <WardrobeProductValuationDialog
              trigger={<Button fullWidth>Find Valuation</Button>}
              product={{ ...productData, brand: brandDetails?.name }}
              token={token || ""}
            />
            <div className="flex w-full gap-x-2">
              <WardrobeProductRepair />
              <WardrobeProductResell
                product={productData}
                token={token || ""}
              />
              <WardrobeProductDonate />
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <WardrobeProductEvents productId={id} />
      </div>
      <Suspense fallback={<RecommendationSkeleton />}>
        <MatchingProducts productId={id || ""} />
      </Suspense>
    </MaxWidthWrapper>
  );
};

export default WardrobeProductScreen;

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

interface Option {
  label: string;
  value: string | number;
}
