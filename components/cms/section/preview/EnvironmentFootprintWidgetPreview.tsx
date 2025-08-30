import EnvironmentalFootprint from "app/(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import React from "react";
import { EnvironmentalFootPrintWidgetModel } from "types/cms/component.types";
import { getToken } from "utils/getToken";

interface EnvironmentFootprintWidgetPreviewProps {
  widgetConfig: EnvironmentalFootPrintWidgetModel;
}

const EnvironmentFootprintWidgetPreview: React.FC<
  EnvironmentFootprintWidgetPreviewProps
> = (props) => {
  const { widgetConfig } = props;
  const { dataType: envType } = widgetConfig || {};
  const token = getToken();

  return (
    <MaxWidthWrapper>
      {envType === "user" && (
        <EnvironmentalFootprint
          dataType={EnvironmentalFootprintTypes.USER}
          showOnlyBody
          token={token || ""}
        />
      )}
      {envType === "overall" && (
        <EnvironmentalFootprint
          dataType={EnvironmentalFootprintTypes.OVERALL}
          showOnlyBody
          token={token || ""}
        />
      )}
    </MaxWidthWrapper>
  );
};

export default EnvironmentFootprintWidgetPreview;
