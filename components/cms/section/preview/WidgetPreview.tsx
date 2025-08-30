import { CSSProperties, FC, useMemo } from "react";
import { getMarginFromConfig, getPaddingFromConfig } from "../utils";
import { PreviewProps } from "./types";
import WidgetPreviewContainer from "./WidgetPreviewContainer";
import ActionWrapper from "components/cms/action/ActionWrapper";
import { CtaActionConfig } from "types/cms/component.types";

export const WidgetPreview: FC<PreviewProps> = (props) => {
  const { widgetConfig, isFirstChild, deviceType } = props;

  const {
    margin,
    padding,
    width,
    isAction,
    bgColor,
    label,
    borderRadius,
    borderThikness,
    borderColor,
    isBorder,
    isAutoWidth,
    extendedBg = false,
    isAbsoluteWidth = false,
  } = widgetConfig || {};

  const backgroundColor =
    bgColor?.includes("#") && bgColor?.length > 7
      ? "unset"
      : bgColor
        ? bgColor
        : "unset";

  const shouldRemovePadding =
    deviceType === "web-max-width" && isFirstChild
      ? extendedBg
        ? true
        : backgroundColor === "unset"
      : false;
  const styles = useMemo<CSSProperties>(
    () => ({
      ...getPaddingFromConfig(padding, shouldRemovePadding),
      ...getMarginFromConfig(margin),
      width: isAutoWidth
        ? "auto"
        : isAbsoluteWidth
          ? `${width}px`
          : width
            ? `${width}%`
            : undefined,
      cursor: isAction ? "pointer" : "default",
      backgroundColor,
      borderRadius: borderRadius ? borderRadius + "px" : undefined,
      maxWidth: "var(--max-width-8xl)",
      // maxWidth: extendedBg ? "var(--max-width-8xl)" : undefined,
      border: !isBorder
        ? "none"
        : `${borderThikness || 0}px solid ${borderColor || "#ffffff04"}`,
    }),
    [
      backgroundColor,
      shouldRemovePadding,
      borderColor,
      borderRadius,
      borderThikness,
      isAbsoluteWidth,
      isAction,
      isAutoWidth,
      isBorder,
      margin,
      padding,
      width,
    ],
  );

  const extendedBgStyles = useMemo<CSSProperties>(
    () => ({
      backgroundColor: backgroundColor,
      width: "100%",
      ...getMarginFromConfig(margin),
    }),
    [backgroundColor, margin],
  );

  const childStyles = useMemo(() => {
    return subtractStyles(styles, extendedBgStyles);
  }, [styles, extendedBgStyles]);

  if (extendedBg) {
    return (
      <div style={extendedBgStyles} aria-label="extended-bg-wrapper">
        {Boolean(widgetConfig) && (
          <>
            {widgetConfig?.isAction ? (
              <ActionWrapper
                styles={{ ...styles, margin: "auto" }}
                onClickConfig={widgetConfig?.onClickConfig as CtaActionConfig}
              >
                <WidgetPreviewContainer {...props} />
              </ActionWrapper>
            ) : (
              <div
                style={{ ...childStyles, margin: "auto" }}
                aria-label={label}
              >
                <WidgetPreviewContainer {...props} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {Boolean(widgetConfig) && (
        <>
          {widgetConfig?.isAction ? (
            <ActionWrapper
              styles={styles}
              onClickConfig={widgetConfig?.onClickConfig as CtaActionConfig}
            >
              <WidgetPreviewContainer {...props} />
            </ActionWrapper>
          ) : (
            <div style={styles} aria-label={label}>
              <WidgetPreviewContainer {...props} />
            </div>
          )}
        </>
      )}
    </>
  );
};

const subtractStyles = (
  baseStyles: CSSProperties,
  stylesToSubtract: CSSProperties,
): CSSProperties => {
  const keysToRemove = Object.keys(stylesToSubtract);
  const result: CSSProperties = {};

  Object.entries(baseStyles).forEach(([key, value]) => {
    if (!keysToRemove.includes(key)) {
      result[key as keyof CSSProperties] = value;
    }
  });

  return result;
};
