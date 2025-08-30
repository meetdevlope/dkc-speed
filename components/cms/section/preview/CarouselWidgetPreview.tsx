import { getComponentDetails } from "app/(with-nav-footer)/action";
import Slider from "components/slider/Slider";
import React from "react";
import { CarousalWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";

interface CarouselWidgetPreviewProps extends PreviewProps {
  widgetConfig: CarousalWidgetModel;
}

const CarouselWidgetPreview: React.FC<CarouselWidgetPreviewProps> = async (
  props,
) => {
  const { widgetConfig, valueProps, deviceType } = props;
  const {
    autoScroll,
    autoScrollDurationMillis,
    childrenPerSlide,
    scrollAnimationMillis,
    showDots,
    allowSnap,
    componentOptions,
  } = widgetConfig || {};

  const slides = await Promise.all(
    componentOptions.map(async (option) => {
      const componentDetails = await getComponentDetails(option?.id);
      return (
        <WidgetPreview
          key={option?.id}
          widgetConfig={
            deviceType === "web" || deviceType === "web-max-width"
              ? componentDetails?.data?.config?.webWidgetModel
              : deviceType === "tab"
                ? componentDetails?.data?.config?.tabWidgetModel
                : componentDetails?.data?.config?.mobileWidgetModel
          }
          valueProps={valueProps}
          deviceType={deviceType}
        />
      );
    }),
  );

  return (
    <Slider
      slides={slides}
      showDots={showDots}
      autoScroll={autoScroll}
      animationDelay={autoScrollDurationMillis}
      animationSpeed={scrollAnimationMillis}
      customOptions={customOptions}
      perPage={childrenPerSlide}
      perMove={childrenPerSlide}
      draggable={allowSnap}
      slidesSpacing={24}
      //   height={maxHeight ? `${maxHeight}px` : undefined}
    />
  );
};

export default CarouselWidgetPreview;

const customOptions = {
  pauseOnHover: true,
  pauseOnFocus: true,
};
