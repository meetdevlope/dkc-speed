import { CSSProperties } from "react";
import { WidgetMargin, WidgetPadding } from "types/cms/component.types";

export const getPaddingFromConfig = (
  padding: WidgetPadding,
  removeHorizontalPadding?: boolean,
): Pick<
  CSSProperties,
  "padding" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom"
> => {
  const { type, all, paddingB, paddingL, paddingR, paddingT } = padding || {};

  const obj: CSSProperties = {};

  if (type === "all" && all && String(all) !== "mix") {
    obj["padding"] = `${all}px`;
  }
  if (type === "individual" && paddingL) {
    obj["paddingLeft"] = `${paddingL}px`;
  }
  if (type === "individual" && paddingR) {
    obj["paddingRight"] = `${paddingR}px`;
  }
  if (type === "individual" && paddingT) {
    obj["paddingTop"] = `${paddingT}px`;
  }
  if (type === "individual" && paddingB) {
    obj["paddingBottom"] = `${paddingB}px`;
  }
  if (removeHorizontalPadding) {
    obj["paddingLeft"] = `0px !important`;
    obj["paddingRight"] = `0px !important`;
  }

  return obj;
};
export const getMarginFromConfig = (
  margin: WidgetMargin,
): Pick<
  CSSProperties,
  "margin" | "marginLeft" | "marginRight" | "marginTop" | "marginBottom"
> => {
  const { type, all, marginB, marginL, marginR, marginT } = margin || {};
  return {
    margin:
      type === "all" && all && String(all) !== "mix" ? `${all}px` : undefined,
    marginLeft: type === "individual" && marginL ? `${marginL}px` : undefined,
    marginRight: type === "individual" && marginR ? `${marginR}px` : undefined,
    marginBottom: type === "individual" && marginB ? `${marginB}px` : undefined,
    marginTop: type === "individual" && marginT ? `${marginT}px` : undefined,
  };
};
