import {
  BagConfigJSON,
  BagConfigResponse,
  getBagConfig,
} from "app/(with-nav-footer)/products/order-dkc-bag/action";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ImageComponent } from "components/image-component/ImageComponent";
import { getToken } from "utils/getToken";
import { jsonParser } from "utils/helpers";
import { ROUTES } from "utils/routes";
import RegisterBagButton from "./components/RegisterBagButton";
import dynamic from "next/dynamic";
import { getComponentDetails } from "app/(with-nav-footer)/action";
import {
  BrandCheckerWidgetModel,
  CommissionStructureWidgetModel,
} from "types/cms/component.types";
const TrustBadges = dynamic(
  () => import("../../../../shop/components/TrustBadges"),
);
const CommissionGuide = dynamic(
  () => import("../../../../sell/components/CommissionGuide"),
);
const BrandChecker = dynamic(
  () => import("../../../../sell/components/BrandChecker"),
);

const VerifyBagReturn = async (props) => {
  const { id: sku } = props?.params;

  const token = getToken();

  const bagConfigRes: BagConfigResponse = await getBagConfig();
  const bagConfig: BagConfigJSON = jsonParser(bagConfigRes?.json) || {};

  const brandCheckerComponentDetails = await getComponentDetails(
    bagConfig?.brandCheckerComponentId,
  );
  const commissionComponentDetails = await getComponentDetails(
    bagConfig?.commissionStructureComponentId,
  );

  return (
    <div>
      <Breadcrumbs showInMobile breadcrumbs={breadcrumbs} />
      <div className="flex flex-col gap-4 px-4 sm:flex-row lg:gap-x-10">
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-xs md:w-1/3">
          <ImageComponent
            fill
            src={bagConfig?.bagImage}
            alt="verify-bag-return-alt"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="w-full max-w-2xl">
          <h5 className="mb-4 font-medium">Enter your bag number</h5>
          <RegisterBagButton sku={sku} token={token as string} />
          <ol className="my-5 flex list-disc flex-col gap-2 p-4 text-neutral-400 [&>*]:text-sm">
            <li>
              Remember, before you send us your clothes, make sure you check
              what we will accept for resale and what we will donate or recycle.
            </li>
            <li>Check we accept your brands here.</li>
            <li>Check your items meet our quality standards here.</li>
            <li>Need a hand? We&apos;re here to help.</li>
          </ol>
        </div>
      </div>
      <BrandChecker
        widgetConfig={
          brandCheckerComponentDetails?.data?.config
            ?.mobileWidgetModel as BrandCheckerWidgetModel
        }
      />
      <CommissionGuide
        widgetConfig={
          commissionComponentDetails?.data?.config
            ?.mobileWidgetModel as CommissionStructureWidgetModel
        }
      />
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
    label: "Return Bag",
    href: "",
  },
];

export default VerifyBagReturn;
