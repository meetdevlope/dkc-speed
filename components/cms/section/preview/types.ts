import { WidgetModel } from "types/cms/component.types";

export interface PreviewProps {
  widgetConfig: WidgetModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueProps?: Record<string, any>;
  deviceType?: string;
  isFirstChild?: boolean;
}
