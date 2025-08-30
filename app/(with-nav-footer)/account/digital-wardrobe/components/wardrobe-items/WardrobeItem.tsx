import { getBrandDetails } from "app/(with-nav-footer)/brand/[id]/action";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import React, { ReactNode } from "react";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { WardrobeItem } from "../../action";
import { getFamilyMemberDetails } from "../../family-member/[id]/actions";
import WardrobeProductValuationDialog from "../../wardrobe-product/[id]/components/WardrobeProductValuationDialog";
import { wearTypeMapper } from "utils/mappers";
import { WardrobeInventoryWarnType } from "../../wardrobe.types";

interface WardrobeProductProps extends WardrobeItem {
  hide?: Array<
    | "photos"
    | "brand"
    | "name"
    | "size"
    | "familyMember"
    | "purchasePrice"
    | "addToCart"
    | "virtualTryOn"
  >;
  allowRedirectToProductDetails?: boolean;
}

const WardrobeProduct: React.FC<WardrobeProductProps> = async (props) => {
  const token = getToken();

  const {
    brand,
    familyMember,
    name,
    photos,
    purchasePrice,
    size,
    wearType,
    hide = [],
    _id,
    createdDate,
    dkcInventory,
    purchaseDate,
    skuId,
    userId,
    allowRedirectToProductDetails = true,
  } = props || {};

  const familyMemberDetails = await getFamilyMemberDetails(
    token || "",
    familyMember || "",
  );
  const brandDetails = await getBrandDetails(brand || "");

  const link = ROUTES.ACCOUNT.DIGITAL_WARDROBE.WARDROBE_PRODUCT_DETAILS(_id);

  return (
    <div>
      <LinkOrDiv link={link} isLink={allowRedirectToProductDetails}>
        {!hide.includes("photos") && (
          <div className="relative aspect-3/4 min-h-64 w-full overflow-hidden">
            <ImageComponent
              src={photos?.[0]}
              alt={name + "-image"}
              fill
              className="rounded-md"
            />
            <div className="fall absolute top-2 left-2 rounded bg-white px-1 py-0.5">
              <span className="text-xs">
                {wearTypeMapper[wearType as WardrobeInventoryWarnType]}
              </span>
            </div>
          </div>
        )}
        <div className="p-2">
          {!hide.includes("brand") && (
            <p className="border-l-2 border-l-primary-500 pl-1 font-semibold text-primary-500 uppercase">
              {brandDetails?.name || "-"}
            </p>
          )}

          {!hide.includes("name") && (
            <h6 className="mt-1 truncate font-primary font-medium text-nowrap md:text-base">
              {name}
            </h6>
          )}

          {(!!size || !hide.includes("familyMember")) && (
            <div className="mt-1 flex items-center justify-between gap-x-4">
              {!hide.includes("size") && size && (
                <h6 className="text-neutral-400">
                  Size <span className="uppercase">{size}</span>
                </h6>
              )}
              {!hide.includes("familyMember") &&
                familyMemberDetails?.member?.name && (
                  <span className="rounded bg-purple-50 p-1 text-xs text-purple-700">
                    {familyMemberDetails?.member?.name}
                  </span>
                )}
            </div>
          )}
        </div>
      </LinkOrDiv>

      {!hide.includes("purchasePrice") && (
        <div className="flex items-center p-2">
          <LinkOrDiv
            link={link}
            isLink={allowRedirectToProductDetails}
            classname="w-full"
          >
            <CurrencyDisplay
              className="font-secondary text-base font-medium"
              amount={purchasePrice}
            />
          </LinkOrDiv>

          <WardrobeProductValuationDialog
            trigger={
              <h6 className="mr-1 cursor-pointer text-nowrap text-primary-500 underline">
                Resell Value
              </h6>
            }
            product={{
              brand: brandDetails?.name,
              familyMember,
              name,
              photos,
              purchasePrice,
              size,
              wearType,
              _id,
              createdDate,
              dkcInventory,
              purchaseDate,
              skuId,
              userId,
            }}
            token={token || ""}
          />
        </div>
      )}
    </div>
  );
};

export default WardrobeProduct;

interface LinkOrDivProps {
  isLink: boolean;
  link: string;
  children: ReactNode;
  classname?: string;
}

export const LinkOrDiv: React.FC<LinkOrDivProps> = ({
  isLink,
  link,
  children,
  classname,
}) => {
  if (isLink) {
    return (
      <Link href={link} className={classname}>
        {" "}
        {children}{" "}
      </Link>
    );
  } else {
    return <div className={classname}> {children} </div>;
  }
};
