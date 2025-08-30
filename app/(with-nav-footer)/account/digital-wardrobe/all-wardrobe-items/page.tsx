import MaxWidthWrapper from "components/MaxWidthWrapper";
import { getToken } from "utils/getToken";
import { getWardrobeItems, WardrobeListType } from "../action";
import WardrobeItems from "../components/wardrobe-items/WardrobeItemList";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ROUTES } from "utils/routes";

const AllWardrobeItems = async (params) => {
  const { searchParams } = params;
  const { search, collection, type } = searchParams;

  const token = getToken();
  const isPurchaseItems = type === WardrobeListType.DKC;

  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "20");

  if (isPurchaseItems) {
    queryParams.append("type", WardrobeListType.DKC);
  }
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
      label: isPurchaseItems ? "Purchased Items" : "All Wardrobe Items",
      href: isPurchaseItems
        ? ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_WARDROBE_ITEMS +
          `?type=${WardrobeListType.DKC}`
        : ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_WARDROBE_ITEMS,
    },
  ];

  return (
    <MaxWidthWrapper>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="my-4 md:my-6">
        <WardrobeItems
          data={wardrobeItems}
          title={isPurchaseItems ? "Purchased Items" : "All Wardrobe Items"}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default AllWardrobeItems;
