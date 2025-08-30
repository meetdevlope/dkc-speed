import { FC, useMemo } from "react";
import { PreviewProps } from "./types";
import { TextWidgetModel } from "types/cms/component.types";
import { cn } from "utils/helpers";

interface TextProps extends PreviewProps {
  widgetConfig: TextWidgetModel;
}

export const TextWidgetPreview: FC<TextProps> = (props) => {
  const { widgetConfig, valueProps } = props;
  const {
    fontSize,
    fontWeight,
    color,
    textAlign,
    text,
    propTextField,
    isAdvanced,
    isUnderLine,
    fontFamily,
  } = widgetConfig || {};
  const valueText = useMemo(() => {
    const value = valueProps?.[propTextField || 0];
    if (typeof value === "string" && value) {
      return value;
    }
    return text;
  }, [propTextField, text, valueProps]);

  const fWeight = useMemo(() => {
    switch (fontWeight) {
      case "bold":
        return 700;
      case "regular":
        return 400;
      case "light":
        return 300;
      case "thin":
        return 200;
      case "semi_bold":
        return 600;
      case "medium":
        return 500;
      case "extra_bold":
        return 800;
      default:
        return 400;
    }
  }, [fontWeight]);

  return (
    <>
      {isAdvanced ? (
        <div
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize + 2}px`,
            fontWeight: fWeight,
            color: color || "black",
            textAlign: textAlign,
            padding: text ? 0 : "10px",
          }}
          className="w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: valueText }}
        />
      ) : (
        <div
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize + 2}px`,
            fontWeight: fWeight,
            color: color || "black",
            textAlign: textAlign,
            padding: text ? 0 : "10px",
          }}
          className={cn(
            `w-full max-w-full`,
            fontFamily === "primary" ? "font-primary" : "font-secondary",
            isUnderLine ? "underline" : "",
          )}
        >
          {valueText}
        </div>
      )}
    </>
  );
};
