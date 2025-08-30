import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SizeChartValueData } from "types/product.types";
import { convertInchToCm, jsonParser } from "utils/helpers";
import { getSizeChart } from "../../action";
import MeasurementToggle from "./MeasurementToggle";

type SizeChartContentProps = {
  sizeChartId: string;
  productSize: string;
};

const SizeChartContent: React.FC<SizeChartContentProps> = (props) => {
  const { sizeChartId, productSize } = props;
  const [measurement, setMeasurement] = useState<string>("");

  const { data: sizeChartData } = useQuery({
    queryKey: [`size-chart-${sizeChartId}`],
    queryFn: () => getSizeChart(sizeChartId),
  });

  const sizeChartTableValues: SizeChartValueData =
    jsonParser(sizeChartData?.value) || {};

  return (
    <div>
      <h3 className="text-left"> {sizeChartData?.name} </h3>
      {sizeChartData?.description && (
        <div
          dangerouslySetInnerHTML={{ __html: sizeChartData?.description }}
          className="text-description mt-2 mb-4 text-left"
        />
      )}

      {sizeChartData?.name ? (
        <>
          <div className="flex justify-end">
            <MeasurementToggle
              measurementUnit={sizeChartTableValues.measurementUnit}
              measurementState={measurement}
              setMeasurementState={setMeasurement}
            />
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="[&>*]:bg-beige/70 border-b border-gray-200 [&>*]:py-3 [&>*]:font-semibold">
                  {sizeChartTableValues?.columns?.map((head, index) => (
                    <th key={index} className="text-center">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeChartTableValues?.rows?.map((row, index) => (
                  <tr
                    key={index}
                    className={`${sizeChartTableValues?.rows?.length === index + 1 ? "" : "border-b border-gray-200"}`}
                  >
                    {sizeChartTableValues?.columns?.map((column, index) => {
                      const isProductSize =
                        Object.values(row)?.includes(productSize);

                      return (
                        <td
                          key={index}
                          className={`py-3 text-center ${isProductSize ? "bg-beige font-semibold" : ""}`}
                        >
                          {index === 1 ? (
                            <>
                              {convertInchToCm(
                                row?.[column],
                                measurement,
                                sizeChartTableValues.measurementUnit,
                              )}
                            </>
                          ) : (
                            <>{row?.[column]}</>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="fall p-4">
          <h6>No size chart found</h6>
        </div>
      )}
    </div>
  );
};

export default SizeChartContent;
