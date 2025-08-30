import { CSSProperties, FC } from "react";
import { RowWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";

interface RowProps extends PreviewProps {
  widgetConfig: RowWidgetModel;
}

export const RowWidgetPreview: FC<RowProps> = (props) => {
  const { widgetConfig, valueProps, deviceType } = props;
  const { childrenConfig, gap, horizontalAlign, verticalAlign } =
    widgetConfig || {};

  const childJsx = () =>
    childrenConfig?.map((config) => {
      return (
        <WidgetPreview
          widgetConfig={config}
          deviceType={deviceType}
          key={config.id}
          valueProps={valueProps}
        />
      );
    });

  const style: CSSProperties = {
    gap: `${gap}px`,
    alignItems: horizontalAlign,
    justifyContent: verticalAlign,
    overflowY: "hidden",
  };

  return (
    <div
      className={`group relative flex w-full items-start overflow-x-auto ${!childrenConfig?.length ? "h-[100px]" : ""}`}
      style={style}
    >
      {childJsx()}
    </div>
  );
};
