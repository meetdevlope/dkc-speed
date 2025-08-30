export type JsxItem = {
  primaryText?: string | JSX.Element;
  secondaryText?: string | JSX.Element;
};

export type TrackerItem = {
  upperJsx?: JsxItem;
  statusKey: string;
  lowerJsx?: JsxItem;
};

export type TrackerProps = {
  data: TrackerItem[];
  currentStatus?: string;
  isCurrentStatus?: (statusKey: string) => boolean;
  orientation?: "horizontal" | "vertical";
};
