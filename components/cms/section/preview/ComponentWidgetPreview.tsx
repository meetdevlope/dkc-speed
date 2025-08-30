import { FC } from "react";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";
import { ComponentWidgetModel } from "types/cms/component.types";
import { getComponentDetails } from "app/(with-nav-footer)/action";

interface ComponentProps extends PreviewProps {
  widgetConfig: ComponentWidgetModel;
}

export const ComponentWidgetPreview: FC<ComponentProps> = async (props) => {
  const { widgetConfig, deviceType } = props;
  const { widgetValues, componentId } = widgetConfig || {};

  const componentDetails = await getComponentDetails(componentId);

  return (
    <div className="w-full">
      <WidgetPreview
        widgetConfig={
          deviceType === "web" || deviceType === "web-max-width"
            ? componentDetails?.data?.config?.webWidgetModel
            : deviceType === "tab"
              ? componentDetails?.data?.config?.tabWidgetModel
              : componentDetails?.data?.config?.mobileWidgetModel
        }
        valueProps={widgetValues}
        deviceType={deviceType}
      />
    </div>
  );
};
