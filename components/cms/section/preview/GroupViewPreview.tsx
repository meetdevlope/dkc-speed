import { FC } from "react";
import { PreviewProps } from "./types";
import { GroupViewWidgetModel } from "types/cms/component.types";
import CardWrapper from "./card/CardWrapper";

interface GroupViewProps extends PreviewProps {
  widgetConfig: GroupViewWidgetModel;
}

export const GroupWidgetPreview: FC<GroupViewProps> = (props) => {
  const { widgetConfig } = props;
  return (
    <div className="w-full max-w-full">
      <CardWrapper config={widgetConfig.config} />
    </div>
  );
};
