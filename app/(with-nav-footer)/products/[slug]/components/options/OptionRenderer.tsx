import React from "react";
import { Product, ProductOptionValues } from "types/product.types";
import SizeGuideButton from "../size-chart/SizeGuideButton";
import { OptionTypeEnum } from "enums/optionType.enum";
import ColorSwatches from "./ColorSwatches";
import { getSizeFromOptions, jsonParser } from "utils/helpers";

type OptionRendererProps = {
  options: Product["options"];
  noSizeGuide?: boolean;
  maxOptionsToDisplay?: number;
  sizeChartId?: string;
};

const OptionRenderer: React.FC<OptionRendererProps> = (props) => {
  const { options, noSizeGuide, maxOptionsToDisplay, sizeChartId } = props;

  const order = ["size", "color", "material"];

  const sortedOption = options?.sort(
    (a, b) => order.indexOf(a.key) - order.indexOf(b.key),
  );

  const renderer = (type: OptionTypeEnum, value: string) => {
    switch (type) {
      case OptionTypeEnum.single_select:
      case OptionTypeEnum.text_input:
      case OptionTypeEnum.multi_select:
        return value;

      case OptionTypeEnum.color_swatches:
        const colorSwatchesValues: ProductOptionValues[] = jsonParser(value);
        return <ColorSwatches data={colorSwatchesValues} />;

      case OptionTypeEnum.rich_text:
        return <span dangerouslySetInnerHTML={{ __html: value }} />;

      default:
        return "Invalid option type";
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {sortedOption?.slice(0, maxOptionsToDisplay)?.map((item, index) => (
        <div key={index}>
          <div className="flex w-full items-center justify-between">
            <h6 className="text-xs text-neutral-400 md:text-sm">
              {" "}
              {item.key}{" "}
            </h6>
            {!noSizeGuide &&
              sizeChartId &&
              item.key.toLowerCase() === "size" && (
                <SizeGuideButton
                  sizeChartId={sizeChartId}
                  productSize={getSizeFromOptions(options) || ""}
                />
              )}
          </div>

          <h6 className="mt-1 font-medium text-neutral-500">
            {renderer(item.type, item.value)}{" "}
          </h6>
        </div>
      ))}
    </div>
  );
};

export default OptionRenderer;
