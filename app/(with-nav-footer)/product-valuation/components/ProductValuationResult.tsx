import { CurrencyDisplay } from "components/CurrencyDisplay";
import React from "react";
import { ProductValuationResponse } from "../action";

interface ProductValuationResultProps {
  response: ProductValuationResponse;
}

const ProductValuationResult: React.FC<ProductValuationResultProps> = (
  props,
) => {
  const { confidence_score, original_retail_price, suggested_resale_price } =
    props?.response || {};

  const noValuation = !suggested_resale_price;

  if (noValuation) {
    return (
      <h5 className="text-center">
        Sorry we couldn&apos;t find a valuable resell price for you product.
      </h5>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary-300 bg-primary-100 p-6">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <p className="mb-1 text-sm font-medium text-gray-600">
              Suggested Resale Price
            </p>
            <p className="text-3xl font-bold text-primary-500">
              £{suggested_resale_price}
            </p>
          </div>

          <div className="text-center">
            <p className="mb-1 text-sm font-medium text-gray-600">
              Confidence Score
            </p>
            {confidence_score && (
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl font-semibold text-gray-900">
                  {Math.round(confidence_score * 100)}%
                </p>
                <div className="h-2 w-16 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-emerald-600 transition-all duration-1000"
                    style={{
                      width: `${confidence_score * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {original_retail_price && (
            <div className="text-center">
              <p className="mb-1 text-sm font-medium text-gray-600">
                Original Retail Price
              </p>
              <p className="text-2xl font-bold text-gray-900">
                <CurrencyDisplay amount={original_retail_price} />
              </p>
            </div>
          )}
        </div>

        {original_retail_price && (
          <div className="mt-6 rounded-lg border border-emerald-100 bg-white p-4">
            <h4 className="mb-4 font-medium text-gray-900">Value Retention</h4>
            <div className="flex flex-col justify-between gap-y-2 md:flex-row md:items-center">
              <span className="text-gray-600">
                {Math.round(
                  (suggested_resale_price / original_retail_price) * 100,
                )}
                % of original value
              </span>
              <span className="font-medium text-emerald-600">
                {suggested_resale_price > original_retail_price * 0.5
                  ? "Good retention"
                  : "Fair retention"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductValuationResult;
