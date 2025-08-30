import { FC } from "react";
import { StackWidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";
import { WidgetPreview } from "./WidgetPreview";

interface StackProps extends PreviewProps {
  widgetConfig: StackWidgetModel;
}

export const StackWidgetPreview: FC<StackProps> = (props) => {
  const { widgetConfig, valueProps, deviceType } = props;
  const { childrenConfig, childVsPositionMap, baseChildConfig } =
    widgetConfig || {};

  const childJsx = () =>
    childrenConfig?.map((config, i) => {
      const position = childVsPositionMap?.[config.id];
      const { bottom, left, right, top } = position || {};
      return (
        <div
          className="absolute w-full"
          style={{
            top: top ? `${top}px` : 0,
            bottom: bottom ? `${bottom}px` : 0,
            left: left ? `${left}px` : 0,
            right: right ? `${right}px` : 0,
            zIndex: (i + 1) * 20,
          }}
          key={config.id}
        >
          <WidgetPreview valueProps={valueProps} widgetConfig={config} />
        </div>
      );
    });

  const baseChildJsx = () => {
    if (!baseChildConfig) {
      return <></>;
    }
    return (
      <WidgetPreview
        valueProps={valueProps}
        widgetConfig={baseChildConfig}
        deviceType={deviceType}
      />
    );
  };

  return (
    <div
      className={`group relative w-full ${!baseChildConfig ? "h-[100px]" : ""}`}
    >
      {Boolean(childrenConfig?.length) && childJsx()}
      {Boolean(baseChildConfig) && baseChildJsx()}
    </div>
  );
};
