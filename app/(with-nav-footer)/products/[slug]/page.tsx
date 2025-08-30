import dynamic from "next/dynamic";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import MaxWidthWrapper from "components/MaxWidthWrapper";

import { CartTypeEnum } from "enums/cartType.enum";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import { ProductStatusTypes } from "enums/productStatusTypes.enum";

import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { PRE_ORDER_TIME_TEXT } from "utils/helpers";
import { ROUTES } from "utils/routes";

const Breadcrumbs = dynamic(() => import("components/Breadcrumbs"), {
  ssr: false,
});
const Divider = dynamic(() => import("components/Divider"), { ssr: false });
const AddToWishlist = dynamic(
  () => import("components/product-card/AddToWishlist"),
  { ssr: false },
);
const Whatsapp = dynamic(() => import("components/share/Whatsapp"), {
  ssr: false,
});

const AddToCartButton = dynamic(
  () => import("../components/add-to-cart/AddToCartButton"),
  { ssr: false },
);
const RecentlyViewed = dynamic(
  () => import("../components/recently-viewed/RecentlyViewed"),
  { ssr: false },
);
const SetRecentlyViewed = dynamic(
  () => import("../components/recently-viewed/SetRecentlyViewed"),
  { ssr: false },
);
const RentWithAddToCart = dynamic(
  () => import("../components/rent-with-add-to-cart/RentWithAddToCart"),
  { ssr: false },
);
const VirtualTryOnButton = dynamic(
  () => import("../components/VirtualTryOnButton"),
  { ssr: false },
);

const DPP = dynamic(() => import("./components/DPP"), { ssr: false });
const OptionRenderer = dynamic(
  () => import("./components/options/OptionRenderer"),
  { ssr: false },
);
const OutOfStock = dynamic(() => import("./components/OutOfStock"), {
  ssr: false,
});
const ProductReview = dynamic(
  () => import("./components/product-review/ProductReview"),
  { ssr: false },
);
const ProductAuthenticated = dynamic(
  () => import("./components/ProductAuthenticated"),
  { ssr: false },
);
const ProductDescription = dynamic(
  () => import("./components/ProductDescription"),
  { ssr: false },
);
const SellBoard = dynamic(() => import("./components/SellBoard"), {
  ssr: false,
});

// Keep utility imports as-is
import { getProductDetails } from "./action";
import { BreadcrumbTypes } from "components/Breadcrumbs";

const GalleryWrapper = dynamic(
  () => import("./components/image-gallery/GalleryWrapper"),
  {
    ssr: false,
  },
);
const ProductDetailsAccordion = dynamic(
  () => import("./components/ProductDetailsAccordion"),
  {
    ssr: false,
  },
);
const EnvironmentalFootprint = dynamic(
  () => import("./components/EnvironmentalFootprint"),
  {
    ssr: false,
  },
);
const BestProductOffer = dynamic(
  () => import("./components/BestProductOffer"),
  {
    ssr: false,
  },
);
const SellerInfo = dynamic(() => import("./components/SellerInfo"), {
  ssr: false,
});
const ProductRecommendation = dynamic(
  () =>
    import("../../../(with-nav-footer)/shop/components/ProductRecommendation"),
  {
    ssr: false,
  },
);
const UserViewedProduct = dynamic(
  () => import("../../../(with-nav-footer)/shop/components/UserViewedProduct"),
  {
    ssr: false,
  },
);

const TrustAndServiceInfo = dynamic(
  () => import("./components/TrustAndServiceInfo"),
  {
    ssr: false,
  },
);

const DKCInstagram = dynamic(
  () => import("../../../../components/DKCInstagram"),
  {
    ssr: false,
  },
);
const TrustBadges = dynamic(
  () => import("../../../(with-nav-footer)/shop/components/TrustBadges"),
  {
    ssr: false,
  },
);

export const revalidate = 300;

const ProductDetailsScreen = async (props) => {
  const slug = props.params.slug || "";
  const token = getToken();
  const deviceId = getDeviceId();

  const productDetails = await getProductDetails(token || "", slug);
  const {
    _id,
    description,
    skuId,
    name,
    totalPrice,
    sellingPrice,
    photos,
    options,
    seller,
    category,
    productStatus,
    eligibleForRent,
    rentDiscountType,
    rentPrice,
    rentPriceDistribution,
    wishlistNumber,
    brand,
    authenticationId,
    certificateUrl,
    type,
  } = productDetails || {};

  const breadcrumbs: BreadcrumbTypes[] = [
    {
      label: "Home",
      href: ROUTES.SHOP,
    },
    {
      label: "Products",
      href: ROUTES.PRODUCTS.ROOT,
    },
  ];

  const url = () => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://demo.designerkidsclub.com";

    return url + ROUTES.PRODUCTS.SLUG(slug);
  };

  const whatsappText = `Checkout this awesome product from DKC.\n\n${name}\n\n${url()}hi`;

  const renderAddToCart = () => {
    if (productStatus == ProductStatusTypes.sold) {
      return <OutOfStock skuId={skuId} token={token || ""} />;
    } else {
      if (eligibleForRent) {
        return (
          <RentWithAddToCart
            price={sellingPrice}
            deviceId={deviceId || ""}
            token={token || ""}
            skuId={skuId}
            rentDiscountType={rentDiscountType}
            rentPrice={rentPrice}
            rentPriceDistribution={rentPriceDistribution}
            originalPrice={totalPrice}
            productId={_id}
            disabled={productStatus !== ProductStatusTypes.available}
            disableMessage="Unavailable"
            image={photos?.[0] || ""}
            name={name}
            options={options}
          />
        );
      } else {
        return (
          <AddToCartButton
            deviceId={deviceId || ""}
            token={token || ""}
            cartType={CartTypeEnum.product_purchase}
            skuId={skuId}
            disabled={productStatus !== ProductStatusTypes.available}
            disableMessage="Unavailable"
            price={sellingPrice}
            originalPrice={totalPrice}
            image={photos?.[0] || ""}
            name={name}
            options={options}
          />
        );
      }
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="pt-0 lg:px-4">
        <div className="flex items-center justify-between px-4">
          <Breadcrumbs breadcrumbs={breadcrumbs} showInMobile />
          <div className="flex items-center gap-2">
            <AddToWishlist
              wishlistNumber={wishlistNumber}
              skuId={skuId}
              token={token || ""}
            />
            <Whatsapp text={whatsappText} />
          </div>
        </div>
        <div className="relative flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="relative w-full max-w-4xl p-4 pt-0">
            <GalleryWrapper images={photos} />
            <VirtualTryOnButton
              skuId={productDetails?.skuId}
              slug={productDetails?.slug}
              token={token || ""}
              productImage={photos?.[0] || ""}
            />
          </div>

          <div className="top-8 z-0 h-fit w-full pb-4 md:sticky lg:max-w-lg">
            <div className="p-4">
              {authenticationId && (
                <ProductAuthenticated className="mb-2" url={certificateUrl} />
              )}
              {type === "preOrder" && (
                <div className="mb-4 flex items-center gap-x-1">
                  <Icon
                    name="clock"
                    iconType="stroke"
                    size={16}
                    className="stroke-2"
                    color="var(--primary-500)"
                  />
                  <p className="font-semibold text-primary-500">
                    Pre Order Item
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-primary"> {name} </h3>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <CurrencyDisplay
                  amount={sellingPrice}
                  className="text-xl md:text-xl lg:text-2xl"
                />
                {totalPrice && totalPrice > sellingPrice && (
                  <CurrencyDisplay
                    amount={totalPrice}
                    className="font-secondary font-medium text-neutral-400 line-through opacity-60"
                  />
                )}
              </div>

              <div className="mt-4 block lg:hidden">{renderAddToCart()}</div>
            </div>

            <Divider isBlueDivider />
            <div className="flex flex-col gap-6 p-4">
              <OptionRenderer
                options={options}
                sizeChartId={productDetails?.sizeChart || ""}
              />
              <SellerInfo category={category} seller={seller} brand={brand} />
            </div>
            <div className="hidden lg:block">{renderAddToCart()}</div>
            <BestProductOffer
              skuId={skuId}
              token={token || ""}
              sellingPrice={sellingPrice}
              originalPrice={productDetails?.totalPrice || 0}
              hideIfNoBestPrice
            />
            {type === "preOrder" && <MoreThanWeek />}
          </div>
        </div>
        <Divider isBlueDivider />

        <div className="flex flex-col-reverse gap-4 px-4 lg:flex-row lg:[&>*]:w-1/2">
          {description && (
            <div className="px-4">
              <ProductDescription description={description} />
            </div>
          )}
          {type === "normal" && (
            <div>
              <TrustAndServiceInfo />
              <div className="flex items-center justify-center gap-x-2 bg-blue-light px-2 py-5 lg:rounded-lg">
                <SellBoard />
                <h6>
                  Do you have similar item?{" "}
                  <Link href={ROUTES.SELL} className="underline">
                    Click here to SELL
                  </Link>{" "}
                </h6>
              </div>
            </div>
          )}
        </div>
        <Divider isBlueDivider className="block lg:hidden" />
        {type !== "preOrder" && (
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:[&>*]:w-1/2">
            <div className="mx-4 rounded-lg border border-neutral-100">
              <EnvironmentalFootprint
                dataType={EnvironmentalFootprintTypes.PRODUCT}
                id={productDetails?.skuId}
                token={token || ""}
              />
            </div>
            <Divider isBlueDivider className="block lg:hidden" />
            {productDetails?.dppUrl && (
              <div className="px-4">
                <DPP link={productDetails?.dppUrl} />
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          <ProductDetailsAccordion />
        </div>
        <Divider isBlueDivider className="mt-4 block lg:hidden" />

        <ProductReview skuId={productDetails?.skuId || ""} />
        <ProductRecommendation token={token || ""} deviceId={deviceId || ""} />
        <RecentlyViewed />
        <Divider isBlueDivider className="my-10 md:my-14 lg:my-16" />

        <DKCInstagram />
        <TrustBadges />
        <SetRecentlyViewed productId={productDetails?.skuId} />
        <UserViewedProduct
          deviceId={deviceId || ""}
          productId={productDetails?._id}
          token={token || ""}
        />
        {/* <SimilarItems /> */}
      </div>
    </MaxWidthWrapper>
  );
};

export async function generateMetadata(
  props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = props.params.slug || "";
  const token = getToken();

  const productDetails = await getProductDetails(token || "", slug);

  if (Object.keys(productDetails?.seo || {}).length < 1)
    return {
      title: "Product Title",
      description: "Product description",
      openGraph: {
        images: [""],
      },
    };

  const previousImages = (await parent).openGraph?.images || [];

  const title = productDetails?.seo?.title || productDetails?.name;

  return {
    title,
    description: productDetails?.seo?.description,
    keywords: productDetails?.seo?.metaTags,
    openGraph: {
      title,
      description: productDetails?.seo?.description,
      images: [
        productDetails?.seo?.photos?.[0] || productDetails?.photos?.[0] || "",
        ...previousImages,
      ],
      siteName: "DKC - Designers Kids Club",
      type: "website",
    },
  };
}

export default ProductDetailsScreen;

const MoreThanWeek = () => (
  <div className="fall mt-2 rounded-lg bg-blue-light p-2">
    <h6 className="font-medium capitalize">{PRE_ORDER_TIME_TEXT}</h6>
  </div>
);
