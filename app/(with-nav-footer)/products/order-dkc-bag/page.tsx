import HowItWorks from "app/(with-nav-footer)/sell/components/how-it-works/HowItWorks";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Divider from "components/Divider";
import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";
import Link from "next/link";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { jsonParser } from "utils/helpers";
import { ROUTES } from "utils/routes";
import { BagConfigJSON, BagConfigResponse, getBagConfig } from "./action";
import NormalBagAddToCart from "./components/NormalBagAddToCart";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import ProductValuationCard from "./components/ProductValuationCard";

const OrderDKCBagScreen = async () => {
  const token = getToken();
  const deviceId = getDeviceId();

  const bagConfigRes: BagConfigResponse = await getBagConfig();
  const bagConfig: BagConfigJSON = jsonParser(bagConfigRes?.json) || {};

  return (
    <MaxWidthWrapper>
      <div className="px-4">
        <Breadcrumbs showInMobile breadcrumbs={breadcrumbs} />
        <div className="block items-stretch md:flex md:gap-10 lg:gap-16">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-sm md:w-1/3">
            <ImageComponent
              fill
              // layout="responsive"
              alt="dkc-bag-image"
              src={bagConfig?.bagImage}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="my-6">
              <h3 className="md:text-2xl lg:text-3xl"> DKC Bag </h3>
              <h6 className="mt-1 text-neutral-400">
                Time for a wardrobe clearout? We make it simple.
              </h6>
              <div className="mt-3">
                <CurrencyDisplay
                  className="text-lg md:mt-6 lg:text-xl"
                  amount={bagConfig?.bagPrice}
                />
              </div>
              <div className="mt-4">
                <NormalBagAddToCart
                  deviceId={deviceId || ""}
                  token={token || ""}
                  isBagAvailable={bagConfig?.isBagAvailable}
                  bagPrice={bagConfig?.bagPrice}
                />
              </div>
            </div>
            <Divider />
            <div className="my-6 flex flex-col gap-8">
              <div className="bg-beige rounded-sm p-4">
                <SectionTitle title="Details" />
                <ol className="mt-4 text-sm [&>li]:mb-2">
                  <li>
                    <strong>Material:</strong> Cotton
                  </li>
                  <li>
                    <strong>Color:</strong> White
                  </li>
                  <li>
                    <strong>More Info:</strong> Find out what you can send{" "}
                    <Link className="underline" href={"#"}>
                      here
                    </Link>
                  </li>
                </ol>
              </div>
              <h6 className="text-description md:mt-6">
                No more home fashion shoots. No overflowing donation bins. Just
                that satisfying post-clearout feeling.
              </h6>
            </div>
          </div>
        </div>
        <ProductValuationCard />
        <HowItWorks />
        {/* <Trending /> */}
        {/* <SimilarItems /> */}
      </div>
    </MaxWidthWrapper>
  );
};

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Order DKC Bag",
    href: ROUTES.PRODUCTS.ORDER_DKC_BAG,
  },
];

export default OrderDKCBagScreen;
