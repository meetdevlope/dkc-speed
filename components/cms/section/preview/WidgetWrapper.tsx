import React from "react";
import { WidgetPreview } from "./WidgetPreview";
import { getComponentDetails } from "app/(with-nav-footer)/action";
import {
  SectionConfig,
  SectionPadding,
} from "app/(with-nav-footer)/[slug]/action";

type WidgetWrapperProps = {
  sectionConfig: SectionConfig;
};

const WidgetWrapper: React.FC<WidgetWrapperProps> = async (props) => {
  const { sectionConfig } = props;
  const { sectionId, padding, webPadding, tabPadding } = sectionConfig || {};

  const componentDetails = await getComponentDetails(sectionId);

  const getPadding = (padding: SectionPadding): React.CSSProperties => {
    switch (padding?.type) {
      case "all":
        return {
          padding: `${padding.all}px`,
        };
      case "individual":
        return {
          paddingTop: padding?.paddingT ? `${padding?.paddingT}px` : undefined,
          paddingRight: padding?.paddingR
            ? `${padding?.paddingR}px`
            : undefined,
          paddingBottom: padding?.paddingB
            ? `${padding?.paddingB}px`
            : undefined,
          paddingLeft: padding?.paddingL ? `${padding?.paddingL}px` : undefined,
        };
      default:
        return {};
    }
  };

  return (
    <>
      <div className="block md:hidden" style={getPadding(padding)}>
        <WidgetPreview
          widgetConfig={componentDetails.data.config.mobileWidgetModel}
          deviceType={"mobile"}
          isFirstChild={true}
        />
      </div>

      <div className="hidden md:block lg:hidden" style={getPadding(tabPadding)}>
        <WidgetPreview
          widgetConfig={componentDetails.data.config.tabWidgetModel}
          deviceType={"tab"}
          isFirstChild={true}
        />
      </div>

      <div
        className="hidden items-center justify-center lg:flex 2xl:hidden"
        style={getPadding(webPadding)}
      >
        <WidgetPreview
          widgetConfig={componentDetails.data.config.webWidgetModel}
          deviceType={"web"}
          isFirstChild={true}
        />
      </div>
      <div
        className="hidden items-center justify-center 2xl:flex"
        style={getPadding(webPadding)}
      >
        <WidgetPreview
          widgetConfig={componentDetails.data.config.webWidgetModel}
          deviceType={"web-max-width"}
          isFirstChild={true}
        />
      </div>
    </>
  );
};

export default WidgetWrapper;
