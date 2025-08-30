import { ColumnWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";
import { CSSProperties, FC } from "react";

interface ColumnProps extends PreviewProps {
  widgetConfig: ColumnWidgetModel;
}

export const ColumnWidgetPreview: FC<ColumnProps> = (props) => {
  const { widgetConfig, valueProps, deviceType } = props;
  const {
    childrenConfig,
    gap = 12,
    verticalAlign,
    horizontalAlign,
  } = widgetConfig || {};

  const childJsx = () =>
    childrenConfig?.map((config, id) => {
      return (
        <WidgetPreview
          key={id}
          valueProps={valueProps}
          widgetConfig={config}
          deviceType={deviceType}
        />
      );
    });

  const style: CSSProperties = {
    gap: `${gap}px`,
    alignItems: verticalAlign,
    justifyContent: horizontalAlign,
  };

  return (
    <div
      className={`group relative flex w-full flex-col ${!childrenConfig?.length ? "h-[100px]" : ""}`}
      style={style}
    >
      {Boolean(childrenConfig?.length) && childJsx()}
    </div>
  );
};
