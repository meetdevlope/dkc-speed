export const revalidate = 3600;

import { Button } from "components/Button";
import ActionWrapper from "components/cms/action/ActionWrapper";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Slider from "components/slider/Slider";
import { getToken } from "utils/getToken";
import { cn } from "utils/helpers";
import { getWardrobeRecommendations } from "../../action";
import {
  fillToVariantMap,
  RecommendationListRequest,
  RecommendationTypeEnum,
  WardrobeInventoryWarnType,
} from "../../wardrobe.types";
import WardrobeSliderProductCard from "./WardrobeSliderProductCard";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const WardrobeSlider = async () => {
  const token = getToken();

  const recommendationData = await getWardrobeRecommendations(
    token || "",
    payload,
  );

  const slides = recommendationData?.map((item, index) => {
    const title = item?.schema?.title;
    const description = item?.schema?.description;
    return (
      <div
        className="bg-neutral-900 px-4 py-8 md:px-6 md:py-16 lg:px-10 lg:py-20"
        key={`slide-${index}`}
      >
        <MaxWidthWrapper>
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex w-full flex-col items-start lg:max-w-1/2">
              {title && (
                <h5 className="mb-2.5 font-semibold text-primary-400 underline">
                  {title}
                </h5>
              )}
              {description && <h6 className="text-white">{description}</h6>}
              <div className="mt-4 flex items-center gap-x-2">
                {item?.schema?.actions?.map((a, i) => (
                  <ActionWrapper key={i} onClickConfig={a?.actionConfig}>
                    <Button
                      variant={fillToVariantMap[a?.fillType]}
                      className={cn(
                        a?.fillType === "outlined" &&
                          "!border-white !text-white hover:bg-white/20",
                      )}
                      size="sm"
                    >
                      {" "}
                      {a?.label}{" "}
                    </Button>
                  </ActionWrapper>
                ))}
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 lg:max-w-1/2 xl:grid-cols-2">
              {item?.wardrobeItemList?.slice(0, 4)?.map((product, index) => (
                <Link
                  href={ROUTES.ACCOUNT.DIGITAL_WARDROBE.WARDROBE_PRODUCT_DETAILS(
                    product?._id,
                  )}
                  key={index}
                >
                  <WardrobeSliderProductCard {...product} />
                </Link>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    );
  });

  return (
    <div>
      <Slider
        slides={slides}
        showDots={true}
        loop={true}
        perPage={1}
        customOptions={customOptions}
        className="mx-auto"
        draggable={true}
      />
    </div>
  );
};

const customOptions = {
  autoplay: true,
  interval: 4000,
  pauseOnHover: true,
  pauseOnFocus: true,
};

export default WardrobeSlider;

const payload: RecommendationListRequest = {
  country: "IN",
  limit: 4,
  source: ["wardrobeCount", "ai"],
  aiRecommendationType: [RecommendationTypeEnum.trendy],
  wardrobeCountRecommendationType: [
    WardrobeInventoryWarnType.lightly_worn,
    WardrobeInventoryWarnType.never_worn,
    WardrobeInventoryWarnType.play_wear,
    WardrobeInventoryWarnType.tried_on_only,
    WardrobeInventoryWarnType.well_loved,
  ],
};
