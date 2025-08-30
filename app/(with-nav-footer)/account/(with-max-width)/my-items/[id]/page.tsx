import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";
import { getCategory } from "app/(with-nav-footer)/category/[slug]/action";
import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import ProductSliderGallery from "app/(with-nav-footer)/products/[slug]/components/image-gallery/ProductSliderGallery";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Card from "components/card/Card";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import ListItem from "components/ListItem";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { getUser } from "utils/getUser";
import { getSizeFromOptions } from "utils/helpers";
import { ROUTES } from "utils/routes";
import RentSwitch from "../components/RentSwitch";

const MyItemDetailsScreen = async (props) => {
  const { params } = props;
  const { id: skuId } = params || {};
  const token = getToken();

  const productDetails = await getProductDetails(token || "", skuId);
  const {
    photos,
    name,
    category,
    options,
    sellingPrice,
    brand,
    seller,
    productStatus,
    _id,
    eligibleForRent,
    rentPrice,
  } = productDetails || {};

  const brandDetails = await getBrandDetails(brand || "");
  const categoryDetails = await getCategory(category || "");
  const deviceId = getDeviceId();
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  const user = await getUser(token || "", deviceIdValue || "");

  const { name: brandName } = brandDetails || {};
  const { name: categoryName } = categoryDetails || {};

  return (
    <div className="p-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} showInMobile />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-grow lg:max-w-[800px]">
          <h3 className="my-4"> {name || ""} </h3>
          <Card title={""}>
            <ul>
              <ListItem label="Brand" value={brandName || ""} variant="2" />
              <ListItem
                label="Category"
                value={categoryName || "-"}
                variant="2"
              />
              <ListItem
                label="Size"
                value={getSizeFromOptions(options) || ""}
                variant="2"
              />
              <ListItem
                label="Selling price"
                value={<CurrencyDisplay amount={sellingPrice} />}
                variant="2"
              />
            </ul>
          </Card>
          {productStatus === ProductStatusTypes.available &&
            rentPrice > 0 &&
            user?.user?._id === seller && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Enable Product for Rent</h4>
                  <RentSwitch
                    id={_id}
                    token={token || ""}
                    forRent={eligibleForRent}
                  />
                </div>
                <h6 className="mt-2 text-neutral-400">
                  Allow your product to be listed for rent while it&apos;s
                  stored in our warehouse. You’ll earn passive income each time
                  it’s rented out. You can disable this option anytime.
                </h6>
              </div>
            )}
        </div>
        <div className="aspect-3/4 w-full lg:w-[25%]">
          <ProductSliderGallery images={photos} />
        </div>
      </div>
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
    href: ROUTES.ACCOUNT.MY_ITEMS,
  },
  {
    label: "Item Details",
    href: "",
  },
];

export default MyItemDetailsScreen;
