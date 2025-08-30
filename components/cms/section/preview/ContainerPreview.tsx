import { FC } from "react";
import { PreviewProps } from "./types";
import { ContainerWidgetModel } from "types/cms/component.types";

interface GroupViewProps extends PreviewProps {
  widgetConfig: ContainerWidgetModel;
}

export const ContainerWidgetPreview: FC<GroupViewProps> = (props) => {
  const { widgetConfig } = props;
  const { height } = widgetConfig;
  return (
    <div
      className="dmz-w-full max-w-full"
      style={{
        height: height ? `${height}px` : "auto",
      }}
    />
  );
};
