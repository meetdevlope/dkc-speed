import { CSSProperties, FC, useMemo } from "react";
import { GridWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";

interface GridProps extends PreviewProps {
  widgetConfig: GridWidgetModel;
}

export const GridWidgetPreview: FC<GridProps> = (props) => {
  const { widgetConfig, valueProps, deviceType } = props;
  const { childrenConfig, gap = 12, columns } = widgetConfig || {};

  const childJsx = () =>
    childrenConfig?.map((config) => {
      return (
        <WidgetPreview
          widgetConfig={config}
          key={config.id}
          valueProps={valueProps}
          deviceType={deviceType}
        />
      );
    });

  const style = useMemo<CSSProperties>(
    () => ({
      gap: `${gap}px`,
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    }),
    [gap, columns],
  );

  return (
    <div
      className={`group relative grid w-full grid-cols-2 flex-col ${!childrenConfig?.length ? "h-[100px]" : ""}`}
      style={style}
    >
      {Boolean(childrenConfig?.length) && childJsx()}
    </div>
  );
};
