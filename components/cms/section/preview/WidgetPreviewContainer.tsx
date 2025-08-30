import BrandChecker from "app/(with-nav-footer)/sell/components/BrandChecker";
import CommissionGuide from "app/(with-nav-footer)/sell/components/CommissionGuide";
import FormRenderer from "components/cms/form/FormRenderer";
import { CSSProperties, FC, useMemo } from "react";
import {
  BaseWidgetType,
  BrandCheckerWidgetModel,
  CarousalWidgetModel,
  ColumnWidgetModel,
  CommissionStructureWidgetModel,
  ComponentWidgetModel,
  ContainerWidgetModel,
  EnvironmentalFootPrintWidgetModel,
  FaqwidgetModel,
  FormWidgetModel,
  GridWidgetModel,
  GroupViewWidgetModel,
  ImageWidgetModel,
  RowWidgetModel,
  StackWidgetModel,
  TextWidgetModel,
  TimelineWidgetModel,
} from "types/cms/component.types";
import CarouselWidgetPreview from "./CarouselWidgetPreview";
import { ColumnWidgetPreview } from "./ColumnWidgetPreview";
import { ComponentWidgetPreview } from "./ComponentWidgetPreview";
import { ContainerWidgetPreview } from "./ContainerPreview";
import EnvironmentFootprintWidgetPreview from "./EnvironmentFootprintWidgetPreview";
import FAQ from "./FAQ";
import { GridWidgetPreview } from "./GridWidgetPreview";
import { GroupWidgetPreview } from "./GroupViewPreview";
import { ImageWidgetPreview } from "./ImageWidgetPreview";
import { RowWidgetPreview } from "./RowWidgetPreview";
import { StackWidgetPreview } from "./StackWidgetPreview";
import { TextWidgetPreview } from "./TextWidgetPreview";
import TimelineWidget from "./TimelineWidget";
import { PreviewProps } from "./types";

interface ContainerProps extends PreviewProps {
  shouldHighlight?: boolean;
}

const WidgetPreviewContainer: FC<ContainerProps> = (props) => {
  const { widgetConfig } = props;

  const { type, borderRadius } = widgetConfig || {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: "100%",
      borderRadius: borderRadius ? borderRadius + "px" : "undefined",
      overflow: borderRadius ? "hidden" : "unset",
    }),

    [borderRadius],
  );

  const jsx = useMemo(() => {
    switch (type) {
      case BaseWidgetType.text:
        return (
          <TextWidgetPreview
            {...props}
            widgetConfig={widgetConfig as TextWidgetModel}
          />
        );
      case BaseWidgetType.row:
        return (
          <RowWidgetPreview
            {...props}
            widgetConfig={widgetConfig as RowWidgetModel}
          />
        );
      case BaseWidgetType.column:
        return (
          <ColumnWidgetPreview
            {...props}
            widgetConfig={widgetConfig as ColumnWidgetModel}
          />
        );

      case BaseWidgetType.grid:
        return (
          <GridWidgetPreview
            {...props}
            widgetConfig={widgetConfig as GridWidgetModel}
          />
        );
      case BaseWidgetType.image:
        return (
          <ImageWidgetPreview
            {...props}
            widgetConfig={widgetConfig as ImageWidgetModel}
          />
        );
      case BaseWidgetType.stack:
        return (
          <StackWidgetPreview
            {...props}
            widgetConfig={widgetConfig as StackWidgetModel}
          />
        );
      case BaseWidgetType.carousal:
        return (
          <CarouselWidgetPreview
            {...props}
            widgetConfig={widgetConfig as CarousalWidgetModel}
          />
        );
      case BaseWidgetType.timeLine:
        return (
          <TimelineWidget
            {...props}
            widgetConfig={widgetConfig as TimelineWidgetModel}
          />
        );
      case BaseWidgetType.grpView:
        return (
          <GroupWidgetPreview
            {...props}
            widgetConfig={widgetConfig as GroupViewWidgetModel}
          />
        );
      case BaseWidgetType.component:
        return (
          <ComponentWidgetPreview
            {...props}
            widgetConfig={widgetConfig as ComponentWidgetModel}
          />
        );
      case BaseWidgetType.container:
        return (
          <ContainerWidgetPreview
            {...props}
            widgetConfig={widgetConfig as ContainerWidgetModel}
          />
        );

      case BaseWidgetType.form:
        return (
          <FormRenderer
            {...props}
            widgetConfig={widgetConfig as FormWidgetModel}
          />
        );
      case BaseWidgetType.brandChecker:
        return (
          <BrandChecker
            {...props}
            widgetConfig={widgetConfig as BrandCheckerWidgetModel}
          />
        );
      case BaseWidgetType.commissionStructure:
        return (
          <CommissionGuide
            {...props}
            widgetConfig={widgetConfig as CommissionStructureWidgetModel}
          />
        );
      case BaseWidgetType.envFootPrint:
        return (
          <EnvironmentFootprintWidgetPreview
            {...props}
            widgetConfig={widgetConfig as EnvironmentalFootPrintWidgetModel}
          />
        );
      case BaseWidgetType.faq:
        return <FAQ {...props} widgetConfig={widgetConfig as FaqwidgetModel} />;
    }
  }, [props, type, widgetConfig]);

  return <div style={styles}> {jsx} </div>;
};

export default WidgetPreviewContainer;
